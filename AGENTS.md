# Arbeitsregeln

## Inhalte

- Fach, Zielgruppe, Voraussetzungen und Lehrplan stehen in `README.md`.
- Texte und Aufgaben sind auf Deutsch. IT-Begriffe, Identifier und APIs bleiben Englisch.
- Neue Begriffe beim ersten Auftreten erklären.
- Versionsabhängige Aussagen mit offiziellen Quellen prüfen.
- Codebeispiele klein und ausführbar halten.

## Einheiten

Jede Einheit enthält:

- Lernziele und Zeitbudget
- angeleitete und selbstständige Praxis
- überprüfbares Ergebnis
- Hilfestellung und Zusatzaufgabe

Folien enthalten Konzepte, Fragen, Diagramme und kurze Beispiele. Begleitblätter enthalten Arbeitsauftrag, nötigen Startcode, Erfolgskriterien, Hilfekarte, Zusatzaufgabe und Quellen. Inhalte nicht unnötig doppeln.

## Dateien

- Folien: `lectures/NN-thema-slides.md`
- Begleitblatt: `lectures/NN-thema-begleitblatt.md`
- Kursdeck: `lectures/slides.md`
- Kapitelanfänge: eindeutiger `routeAlias`
- Kursübersicht: interne `<Link>`-Sprünge
- Kursbezeichnung: `themeConfig.courseLabel`

## Gestaltung

- Markdown bevorzugen.
- Layouts: `default`, `cover`, `section`, `exercise`, `two-cols`.
- Kein Inline-CSS oder dekoratives HTML.
- Vue nur für Navigation oder didaktische Einblendungen.
- Fließtext nicht manuell umbrechen.
- Zentrale Gestaltung in `.slidev/` belassen.

## Veröffentlichung

- Lösungen, Prüfungen und `_temp/` nicht einbinden.
- Speaker Notes und Builds als öffentlich behandeln.
- Decks nur ausdrücklich in `lectures/slides.md` aufnehmen.

## Prüfung und Git

- Theme-Änderung: Kurs und Demo bauen, danach im Browser prüfen.
- Inhaltsänderung: betroffenes Deck prüfen.
- Nicht ausgeführte Prüfungen nennen.
- Bestehende Änderungen erhalten und nur eigene Dateien stagen.
- Vor Commit, Push oder Veröffentlichung Zustimmung einholen.
- Keine Subagents ohne Auftrag.
