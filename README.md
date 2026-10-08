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

[Slidev-Anleitung](SLIDEV.md) · [Regeln für Coding-Agents](AGENTS.md)

## Struktur

- `lectures/slides.md`: gemeinsamer Kursfoliensatz
- `lectures/NN-thema-slides.md`: Folien einer Einheit
- `lectures/NN-thema-begleitblatt.md`: Aufgaben und Hilfen
- `lectures/00-demo/`: Slidev-Demo
- `.slidev/`: Theme, Layouts, Branding und Fonts

## Als Template verwenden

1. GitHub: **Settings → Template repository** aktivieren.
2. Über **Use this template** ein Kursrepository erstellen.
3. README, Paketname, Kursdeck und Kursbezeichnung anpassen.
4. Fachliche Regeln in `AGENTS.md` ergänzen.

Deploy und Handout-Copy sind nicht eingerichtet.
