# Slidev verwenden

## Installation

- [Node.js](https://nodejs.org/en/download) ≥ 22.12
- [Bun](https://bun.sh/docs/installation)
- Unter Windows: Ubuntu/WSL2 empfohlen
- Node.js, Bun und Projekt in derselben Umgebung verwenden

```bash
node --version
bun --version
bun install --frozen-lockfile
```

## Befehle

```bash
bun run slides                                      # Kurs starten
bun run slides:demo                                 # Demo starten
bun run slides:deck lectures/01-beispiel-slides.md # Einzelnes Deck starten
bun run slides:build                                # Kurs nach dist/ bauen
```

Build mit URL-Unterpfad:

```bash
bun run slides:build --base /mein-kurs/
```

Einzelnes Deck bauen:

```bash
bun run slides:deck build lectures/01-beispiel-slides.md --out ../dist/beispiel
```

## Neue Einheit

1. Beispieldeck und Begleitblatt kopieren.
2. Dateien als `NN-thema-slides.md` und `NN-thema-begleitblatt.md` benennen.
3. Titel, Autor, Lernziele und eindeutigen `routeAlias` setzen.
4. Deck in `lectures/slides.md` mit `src` einbinden.
5. Kursübersicht und README ergänzen.
6. Deck im Browser prüfen.

Kursbezeichnung im ersten Frontmatter (Beispiel):

```yaml
themeConfig:
  courseLabel: SYT3 · Docker
```

Bei einzeln gestarteten Decks ebenfalls setzen. Der Standard steht in `.slidev/package.json`.

## Theme

Die Repository-Scripts laden das lokale Theme automatisch.

| Datei | Zweck |
| --- | --- |
| `.slidev/package.json` | Format, Fonts, Farben und Standardbezeichnung |
| `.slidev/styles/index.css` | Typografie und Abstände |
| `.slidev/global-top.vue` | Logo |
| `.slidev/global-bottom.vue` | Kursbezeichnung und Seitenzahlen |
| `.slidev/layouts/` | zusätzliche Layouts |
| `.slidev/setup/mermaid.ts` | Mermaid-Design |
| `.slidev/public/` | Logos und lokale Fonts |

- Format: 3:2 (`3/2`), Canvasbreite 980
- Layouts: `default`, `cover`, `section`, `exercise`, `two-cols`
- Rechte Spalte: `::right::`
- Hinweise: Markdown-Blockquotes
- Einblendungen: `v-click` und `v-clicks`
- Notizen: HTML-Kommentare; keine vertraulichen Inhalte eintragen

Tasten: Pfeile = Navigation · `O` = Übersicht · `P` = Presenter Mode

## Prüfung

- Kurs und Demo bauen.
- Navigation, Code, Diagramme, Bilder und Fonts prüfen.
- Auf überlaufende Folien achten.
- Offline und am Schulbeamer testen.

## Herkunft

- Basis: `MEDT3-lectures`
- Branding: [LITEC](https://www.litec.ac.at/)
- Farben: `#01315c` und `#cc7575`
- Fonts: Inter und JetBrains Mono inklusive OFL-Lizenzen

[Slidev-Dokumentation](https://sli.dev/guide/) · [Markdown-Syntax](https://sli.dev/guide/syntax)
