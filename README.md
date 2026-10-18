# Slidev Lectures Template

Vorlage für Unterrichtsfolien und Begleitblätter im LiTec-Design.

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

[Slidev-Anleitung](docs/slidev.md) · [Technische Details](docs/technical-details.md) · [Organization-Infrastruktur](https://github.com/litec-courses/course-tooling/blob/main/docs/github-organization.md) · [Regeln für Coding-Agents](AGENTS.md)

## Struktur

- `lectures/slides.md`: gemeinsamer Kursfoliensatz
- `lectures/NN-thema-slides.md`: Folien einer Einheit
- `lectures/NN-thema-begleitblatt.md`: Aufgaben und Hilfen
- `lectures/00-demo/`: Slidev-Demo
- `exams/`: nicht veröffentlichte Prüfungsunterlagen und Lösungen; neutrale Vorlagen liegen unter `exams/tmpl/`
- `docs/`: Anleitungen zu Slidev, technischen Details und der GitHub-Organization
- `package.json`: fest gepinnte Version des gemeinsamen Themes und Publishers

## Als Template verwenden

1. GitHub: **Settings → Template repository** aktivieren.
2. Über **Use this template** ein Kursrepository erstellen.
3. README, Paketname, Kursdeck und Kursbezeichnung anpassen.
4. Fachliche Regeln in `AGENTS.md` ergänzen.

## Veröffentlichung mit GitHub Pages

Die in `lectures/publish.yml` ausdrücklich freigegebenen Folien, Begleitblätter und zusätzlichen Ressourcen werden bei einem Push auf `main` veröffentlicht. Die erzeugte Kursseite enthält interaktive Folien, PDF-Downloads der Folien, Begleitblätter als Markdown und verlinkte Ressourcendateien.

Zusätzliche Dateien wie PDFs und Git-getrackte Verzeichnisse werden innerhalb einer Unit unter `resources` eingetragen. Verzeichnisse stellt der Publisher automatisch als ZIP-Datei bereit:

```yaml
- slug: beispielmaterial
  title: Zusätzliches Beispielmaterial
  resources:
    - title: Beispielmaterial als PDF
      file: lectures/00-demo/assets/beispielmaterial.pdf
    - title: Starterprojekt als ZIP
      directory: examples/starter-project
```

Nur ausdrücklich eingetragene Ressourcen werden veröffentlicht.

```bash
bun run pages:build
bun run pages:preview
```

Im Kursrepository unter **Settings → Pages → Build and deployment** als Quelle **GitHub Actions** auswählen. Lösungen, Prüfungen und `_temp/` nicht in `lectures/publish.yml` aufnehmen.

Theme, Publisher und wiederverwendbarer Pages-Workflow sind unveränderlich auf [`course-tooling@v0.8.0`](https://github.com/litec-courses/course-tooling/tree/v0.8.0) gepinnt.

## Lizenz

Eigener Quellcode und eigene Template-Inhalte stehen unter der [MIT-Lizenz](LICENSE), sofern nicht anders angegeben.

Die vom gemeinsamen Theme eingebetteten Fonts behalten ihre OFL-Lizenzen. Name, Logos und Branding von LiTec sind nicht Teil der MIT-Lizenz.
