# Technische Details

Hinweise für Wartung und Veröffentlichung.

## Dependabot

[Dependabot](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates) prüft monatlich:

- Bun-Pakete in `package.json` und `bun.lock`
- GitHub Actions in `.github/workflows/`

Die Konfiguration steht in `.github/dependabot.yml`. Updates kommen gebündelt als Pull Requests. Vor dem Merge den Pages-Build und seine Dateien prüfen.

> [!WARNING]
> Neue Repositories sind eigenständige Kopien des Templates. Sie erhalten spätere Änderungen nicht. Alte Repositories brauchen die Dependabot-Konfiguration einmalig.

GitHub unterstützt den textbasierten `bun.lock`. Siehe [unterstützte Ökosysteme](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories#bun).

## GitHub Pages

`.github/workflows/pages.yml` läuft bei Pull Requests, bei Pushes auf `main` und manuell. Er installiert Bun und Chromium. Dann baut er die Freigaben aus `lectures/publish.yml`.

Pull Requests bauen und prüfen nur. Pushes auf `main` und manuelle Läufe auf `main` veröffentlichen Decks, PDFs und Markdown-Dateien aus `dist/`.

Repository: **Settings → Pages → Build and deployment → GitHub Actions**. Jekyll wird nicht verwendet. Siehe [GitHub Pages mit eigenem Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Workflow mit Docker prüfen:

```bash
docker run --rm -v "$PWD:/repo:ro" -w /repo rhysd/actionlint:latest -color .github/workflows/pages.yml
```

Der Befehl braucht Docker. Keine Ausgabe bedeutet: `actionlint` hat keine Probleme gefunden.

> [!WARNING]
> Pages-Builds sind öffentlich. `--without-notes` schließt Speaker Notes aus. Prüfungen, Lösungen und `_temp/` nie in `lectures/slides.md` oder `lectures/publish.yml` aufnehmen.

## GitHub Education

Verifizierte Lehrkräfte können eine Unterrichts-Organization auf GitHub Team umstellen:

1. [Teacher Dashboard](https://education.github.com/globalcampus/teacher) öffnen.
2. **Upgrade your academic organizations** wählen.
3. **Upgrade to GitHub Team** wählen.

Die Option liegt nicht unter Billing. Fehlt sie, [Education-Status](https://github.com/settings/education/benefits) und Owner-Rolle prüfen.

## Branch-Schutz

Änderungen per Feature-Branch und Pull Request nach `main` bringen. Templates übertragen keine Repository-Einstellungen.

Die Custom Property `protection_profile` schützt den Default Branch:

- `off`: kein Organization Ruleset
- `pull_request`: Pull Request ohne fremde Approval
- `review_required`: Pull Request mit fremder Approval

Einrichtung und Tests: [GitHub-Organization verwalten](infrastructure.md).

Der Pages-Build kann als erforderlicher Pull-Request-Check dienen. Deployments bleiben auf `main` beschränkt.

## TODO

- [ ] Repository `litec-slidev` mit versioniertem Package und Pages-Workflow erstellen.
- [ ] Template auf feste Package- und Workflow-Versionen umstellen und mit einem Testkurs prüfen.
- [ ] Wiederverwendbare Exam-Beispiele aus bestehenden Prüfungen erstellen.
- [ ] Infrastruktur in alte Repositories übernehmen.
- [x] `protection_profile` und Rulesets einrichten.
- [x] Pages-Workflow für Pull Requests erweitern.
- [x] Build als erforderlichen Check eintragen.
- [ ] Prozess für Major-Updates festlegen.
- [ ] Merge-Prozess für Dependabot festlegen.
