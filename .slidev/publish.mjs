import { spawn } from 'node:child_process';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import { chromium } from 'playwright-chromium';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const configPath = path.join(root, 'lectures/publish.yml');
const base = normalizeBase(process.env.PAGES_BASE || '/');
const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true });

function normalizeBase(value) {
  return `/${value.split('/').filter(Boolean).join('/')}${value === '/' ? '' : '/'}`;
}

function publicUrl(relativePath) {
  return `${base}${relativePath.replace(/^\/+/, '')}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function runSlidev(args) {
  const runner = path.join(root, '.slidev/run.mjs');
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [runner, ...args], { cwd: root, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`Slidev exited with code ${code}.`)));
  });
}

async function assertFile(relativePath, label) {
  if (!relativePath || path.isAbsolute(relativePath) || relativePath.includes('..'))
    throw new Error(`${label} must be a relative path within the repository.`);
  await readFile(path.join(root, relativePath));
}

async function loadConfig() {
  const config = YAML.parse(await readFile(configPath, 'utf8'));
  if (!config?.course?.title || !config?.course?.slides || !config?.labels || !Array.isArray(config.units))
    throw new Error('lectures/publish.yml requires course.title, course.slides, labels, and units.');

  const slugs = new Set();
  await assertFile(config.course.slides, 'course.slides');
  for (const unit of config.units) {
    if (!unit.slug?.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) || slugs.has(unit.slug))
      throw new Error(`Invalid or duplicate slug: ${unit.slug}`);
    if (!unit.title || !unit.slides || !unit.handout)
      throw new Error(`Unit ${unit.slug} requires title, slides, and handout.`);
    slugs.add(unit.slug);
    await assertFile(unit.slides, `${unit.slug}.slides`);
    await assertFile(unit.handout, `${unit.slug}.handout`);
  }
  return config;
}

async function buildDeck(source, slug, pdfName) {
  const deckOut = path.join(dist, 'slides', slug);
  const deckBase = publicUrl(`slides/${slug}/`);
  await runSlidev(['build', source, '--out', deckOut, '--base', deckBase, '--without-notes']);
  await cp(path.join(root, '.slidev/public/litec-icon.png'), path.join(deckOut, 'litec-icon.png'));
  await runSlidev(['export', source, '--output', path.join(dist, 'downloads', pdfName), '--with-toc']);
}

function withoutFrontmatter(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

async function exportHandout(browser, unit, css) {
  const handoutPath = path.join(root, unit.handout);
  const source = withoutFrontmatter(await readFile(handoutPath, 'utf8'));
  await cp(handoutPath, path.join(dist, 'downloads', `${unit.slug}-begleitblatt.md`));
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${css}</style></head><body>${markdown.render(source)}</body></html>`;
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({
    path: path.join(dist, 'downloads', `${unit.slug}-begleitblatt.pdf`),
    format: 'A4',
    printBackground: true,
  });
  await page.close();
}

function renderIndex(config) {
  const labels = config.labels;
  const units = config.units.map((unit) => `
    <article>
      <h2>${escapeHtml(unit.title)}</h2>
      <div class="actions">
        <a class="button" href="${publicUrl(`slides/${unit.slug}/`)}">${escapeHtml(labels.openSlides)}</a>
        <a class="button secondary" href="${publicUrl(`downloads/${unit.slug}-folien.pdf`)}" download>${escapeHtml(labels.downloadSlides)}</a>
        <a class="button secondary" href="${publicUrl(`downloads/${unit.slug}-begleitblatt.md`)}" download>${escapeHtml(labels.downloadHandoutMarkdown)}</a>
        <a class="button secondary" href="${publicUrl(`downloads/${unit.slug}-begleitblatt.pdf`)}" download>${escapeHtml(labels.downloadHandoutPdf)}</a>
      </div>
    </article>`).join('');

  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.course.title)}</title>
  <link rel="icon" type="image/png" href="${publicUrl('assets/litec-icon.png')}">
  <link rel="stylesheet" href="${publicUrl('styles.css')}">
</head>
<body>
  <header>
    <img src="${publicUrl('assets/litec-icon.png')}" alt="LiTec">
    <div>
      <h1>${escapeHtml(config.course.title)}</h1>
      <p>${escapeHtml(config.course.description || '')}</p>
    </div>
  </header>
  <main>
    <section class="course">
      <h2>${escapeHtml(labels.course)}</h2>
      <div class="actions">
        <a class="button" href="${publicUrl('slides/kurs/')}">${escapeHtml(labels.openCourseSlides)}</a>
        <a class="button secondary" href="${publicUrl('downloads/kurs-folien.pdf')}" download>${escapeHtml(labels.downloadCourseSlides)}</a>
      </div>
    </section>
    <section class="units" aria-label="${escapeHtml(labels.units)}">${units}
    </section>
    <footer>${escapeHtml(labels.footer)}</footer>
  </main>
</body>
</html>`;
}

async function main() {
  const config = await loadConfig();
  await rm(dist, { recursive: true, force: true });
  await mkdir(path.join(dist, 'downloads'), { recursive: true });

  await buildDeck(config.course.slides, 'kurs', 'kurs-folien');
  for (const unit of config.units)
    await buildDeck(unit.slides, unit.slug, `${unit.slug}-folien`);

  const browser = await chromium.launch({ headless: true });
  try {
    const css = await readFile(path.join(root, '.slidev/styles/handout.css'), 'utf8');
    for (const unit of config.units)
      await exportHandout(browser, unit, css);
  }
  finally {
    await browser.close();
  }

  await cp(path.join(root, '.slidev/styles/pages.css'), path.join(dist, 'styles.css'));
  await mkdir(path.join(dist, 'assets'), { recursive: true });
  await cp(path.join(root, '.slidev/public/litec-icon.png'), path.join(dist, 'assets/litec-icon.png'));
  await writeFile(path.join(dist, 'index.html'), renderIndex(config));
  await writeFile(path.join(dist, '.nojekyll'), '');
  console.log(`GitHub Pages output created: ${dist}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
