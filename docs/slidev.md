# Slidev verwenden

## Installation

- [Node.js](https://nodejs.org/en/download) ab 22.12
- [Bun](https://bun.sh/docs/installation)
- unter Windows: Ubuntu/WSL2 empfohlen

Node.js, Bun und das Projekt müssen in derselben Umgebung liegen.

```bash
node --version
bun --version
bun install --frozen-lockfile
```

## Visual Studio Code

`.vscode/extensions.json` empfiehlt:

- **Open in Typora**: Markdown in Typora öffnen
- **GitHub Markdown Preview**: GitHub-Vorschau anzeigen
- **Slidev**: Folien anzeigen und navigieren
- **markdownlint**: Markdown prüfen
- **YAML**: Frontmatter, Workflows und `publish.yml` unterstützen
- **Bun for Visual Studio Code**: Bun integrieren

Einfügen oder Drag-and-drop speichert Bilder im nahen Ordner `assets/`. VS Code erzeugt den relativen Link. Die Einstellung steht in `.vscode/settings.json`. Mehr dazu: [Bilder in Markdown](https://code.visualstudio.com/docs/languages/markdown#_inserting-images-and-links-to-files).

## Befehle

```bash
bun run slides                                      # Kurs starten
bun run slides:demo                                 # Demo starten
bun run slides:deck lectures/01-beispiel-slides.md # Deck starten
bun run slides:build                                # Kurs bauen
bun run slides:build --base /mein-kurs/             # mit URL-Unterpfad
bun run slides:deck build lectures/01-beispiel-slides.md --out ../dist/beispiel
bun run pages:build                                 # Pages bauen
bun run pages:preview                               # Pages prüfen
```

`lectures/publish.yml` gibt Inhalte frei. Der Pages-Build erzeugt Decks, Folien-PDFs und Begleitblätter in `dist/`.

## Neue Einheit

1. Beispieldeck und Begleitblatt kopieren.
2. Als `NN-thema-slides.md` und `NN-thema-begleitblatt.md` benennen.
3. Titel, Autor, Lernziele und eindeutigen `routeAlias` setzen.
4. Deck in `lectures/slides.md` einbinden.
5. Kursübersicht und README ergänzen.
6. Deck im Browser prüfen.

Kursbezeichnung im ersten Frontmatter:

```yaml
themeConfig:
  courseLabel: SYT3 · Docker
```

Auch einzelne Decks brauchen den Wert. Der Standard steht in `.slidev/package.json`.

## Theme

Die Scripts laden das lokale Theme automatisch.

| Datei | Zweck |
| --- | --- |
| `.slidev/package.json` | Format, Fonts, Farben, Kursbezeichnung |
| `.slidev/styles/index.css` | Typografie und Abstände |
| `.slidev/global-top.vue` | Logo |
| `.slidev/global-bottom.vue` | Kursbezeichnung und Seitenzahlen |
| `.slidev/layouts/` | Layouts |
| `.slidev/setup/mermaid.ts` | Mermaid-Design |
| `.slidev/public/` | Logos und Fonts |

- Format: 3:2 (`3/2`), Canvasbreite 980
- Layouts: `default`, `cover`, `section`, `exercise`, `two-cols`
- rechte Spalte: `::right::`
- Hinweise: Blockquotes
- Einblendungen: `v-click`, `v-clicks`
- Notizen: HTML-Kommentare; der Pages-Build schließt sie aus
- Tasten: Pfeile, `O` für Übersicht, `P` für Presenter Mode

## Prüfung

- Kurs und Demo bauen.
- Navigation, Code, Diagramme, Bilder und Fonts prüfen.
- Überlaufende Folien suchen.
- Offline und am Schulbeamer testen.

## Herkunft

- Basis: `MEDT3-lectures`
- Branding: [LITEC](https://www.litec.ac.at/)
- Farben: `#01315c`, `#cc7575`
- Fonts: Inter und JetBrains Mono mit OFL-Lizenzen

[Slidev-Dokumentation](https://sli.dev/guide/) · [Markdown-Syntax](https://sli.dev/guide/syntax)
