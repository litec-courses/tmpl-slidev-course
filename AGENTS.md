# Working Rules

## Content

- Define the subject, target audience, prerequisites, and curriculum in `README.md`.
- Write teaching text and exercises in German. Keep IT terms and APIs in English.
- Write all code examples in English, including variable, function, method, class, property, parameter, and example-data names.
- Explain new terms when they first appear.
- Verify version-dependent statements against official sources.
- Keep code examples small and executable.

## Units

Each unit contains:

- learning objectives and a time budget
- guided and independent practice
- a verifiable outcome
- guidance and an extension task

Slides contain concepts, questions, diagrams, and short examples. Handouts contain the assignment, required starter code, success criteria, a help card, an extension task, and sources. Avoid unnecessary duplication.

## Files

- Keep the repository root as small as practical. Place examples, documentation, scripts, and configuration in dedicated directories when supported by their tools.
- Explain files that must remain in the repository root in `README.md`.
- Slides: `lectures/NN-topic-slides.md`
- Handout: `lectures/NN-topic-begleitblatt.md`
- Course deck: `lectures/slides.md`
- Exams and related solutions: `exams/`
- Chapter starts: unique `routeAlias`
- Course overview: internal `<Link>` navigation
- Course label: `themeConfig.courseLabel`

## Design

- Prefer Markdown.
- Layouts: `default`, `cover`, `section`, `exercise`, `two-cols`.
- Do not use inline CSS or decorative HTML.
- Use Vue only for navigation or instructional reveals.
- Do not manually wrap prose.
- Keep shared design in `.slidev/`.
- Set an explicit root font size for screen styles and use `rem` or `em` for typography and spacing. Pixel units are acceptable for one-pixel borders.
- Use print-appropriate physical units such as `mm` for page geometry and `pt` for typography in print-only styles.
- Use GitHub-style alerts such as `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION` when they make documentation easier to scan.

## Publishing

- Do not include solutions, exams, or `_temp/`.
- Never add files from `exams/` to `lectures/slides.md` or `lectures/publish.yml`.
- Treat published builds as public. Keep speaker notes out of Pages builds with `--without-notes`.
- Add decks to `lectures/slides.md` only when explicitly requested.
- Add downloadable material to `lectures/publish.yml` only when explicitly requested.

## Verification and Git

- For theme changes, build the course and demo, then verify them in a browser.
- For content changes, verify the affected deck.
- Report checks that were not run.
- Preserve existing changes and stage only files changed for the current task.
- Ask for approval before committing, pushing, or publishing.
- Use Conventional Commits for every commit message, for example `feat: add course downloads`, `fix: correct export paths`, or `chore: update dependencies`.
- Do not use subagents unless explicitly requested.
