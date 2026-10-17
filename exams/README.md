# Prüfungen

Der Unterordner `tmpl/` enthält neutrale Vorlagen für Prüfungsangaben und zugehörige Lösungs- und Beurteilungsunterlagen:

- [`tmpl-exam.md`](tmpl/tmpl-exam.md): vier Druckseiten mit Bewertungsübersicht
- [`tmpl-exam-short.md`](tmpl/tmpl-exam-short.md): platzsparende Variante mit horizontaler Punktevergabe
- [`tmpl-solution.md`](tmpl/tmpl-solution.md): paralleler Aufbau für Musterlösung und Korrekturschema

Vor der Verwendung die benötigten Dateien kopieren und fachlich anpassen.

Die drei HTML-Seitenumbrüche erzeugen vier Druckseiten. Vor dem Druck die Vorschau auf genau vier A4-Seiten prüfen und anschließend die Booklet-/Broschürenfunktion des Druckers für ein beidseitiges A3-Blatt verwenden.

- Inhalte aus diesem Ordner niemals in `lectures/slides.md` oder `lectures/publish.yml` aufnehmen.
- Konkrete Prüfungen und Lösungen niemals im öffentlichen Template ablegen.
- Speaker Notes, Build-Artefakte und GitHub Pages als öffentlich behandeln.
- Vor dem Commit prüfen, ob personenbezogene Daten oder ausgefüllte Schülerarbeiten enthalten sind.
