# Slidev Lectures Template

Vorlage für Unterrichtsfolien und Begleitblätter im LITEC-Design.

## Kurs

- **Fach / Jahrgang:** ergänzen
- **Voraussetzungen:** ergänzen
- **Umfang:** ergänzen
- **Lernziele:** ergänzen

## Lehrplan

Lehrplan mit Quelle und Stand einfügen. Einheiten den Kompetenzen zuordnen.

## Unterrichtseinheiten

| Einheit | Thema | Folien | Begleitblatt | Lehrplanbezug |
| --- | --- | --- | --- | --- |
| 01 | Beispiel | [Folien](lectures/01-beispiel-slides.md) | [Begleitblatt](lectures/01-beispiel-begleitblatt.md) | ergänzen |

## Start

Voraussetzungen: Node.js ≥ 22.12 und Bun. Unter Windows wird Ubuntu/WSL2 empfohlen.

```bash
bun install --frozen-lockfile
bun run slides
```

[Slidev-Anleitung](SLIDEV.md) · [Technische Details](details.md) · [Regeln für Coding-Agents](AGENTS.md)

## Struktur

- `lectures/slides.md`: gemeinsamer Kursfoliensatz
- `lectures/NN-thema-slides.md`: Folien einer Einheit
- `lectures/NN-thema-begleitblatt.md`: Aufgaben und Hilfen
- `lectures/00-demo/`: Slidev-Demo
- `exams/`: nicht veröffentlichte Prüfungsunterlagen und Lösungen
- `.slidev/`: Theme, Layouts, Branding und Fonts

## Als Template verwenden

1. GitHub: **Settings → Template repository** aktivieren.
2. Über **Use this template** ein Kursrepository erstellen.
3. README, Paketname, Kursdeck und Kursbezeichnung anpassen.
4. Fachliche Regeln in `AGENTS.md` ergänzen.

## Veröffentlichung mit GitHub Pages

Die in `lectures/publish.yml` ausdrücklich freigegebenen Folien und Begleitblätter werden bei einem Push auf `main` veröffentlicht. Die erzeugte Kursseite enthält interaktive Folien, PDF-Downloads der Folien sowie Begleitblätter als Markdown und PDF.

```bash
bun run pages:build
bun run pages:preview
```

Im Kursrepository unter **Settings → Pages → Build and deployment** als Quelle **GitHub Actions** auswählen. Lösungen, Prüfungen und `_temp/` nicht in `lectures/publish.yml` aufnehmen.
