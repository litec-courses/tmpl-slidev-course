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

`.github/workflows/pages.yml` läuft manuell oder bei Pushes auf `main`. Er installiert Bun und Chromium. Dann baut er die Freigaben aus `lectures/publish.yml`. Er veröffentlicht Decks, PDFs und Markdown-Dateien aus `dist/`.

Einstellung: **Settings → Pages → Build and deployment → GitHub Actions**. Jekyll wird nicht verwendet. Siehe [GitHub Pages mit eigenem Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

> [!WARNING]
> Speaker Notes und Builds sind öffentlich. Prüfungen, Lösungen und `_temp/` nie in `lectures/slides.md` oder `lectures/publish.yml` aufnehmen.

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
- `reviewed`: Pull Request mit fremder Approval

Einrichtung und Tests: [GitHub-Organization verwalten](infrastructure.md).

Der Pages-Workflow läuft noch nicht bei Pull Requests. Sein Build darf daher noch kein erforderlicher Check sein. Deployments bleiben auf `main` beschränkt.

## TODO

- [ ] Paket für Theme, Layouts und Publish-Scripts prüfen.
- [ ] Infrastruktur in alte Repositories übernehmen.
- [ ] `protection_profile` und Rulesets einrichten.
- [ ] Pages-Workflow für Pull Requests erweitern.
- [ ] Build als erforderlichen Check eintragen.
- [ ] Zentralen Workflow prüfen.
- [ ] Prozess für Major-Updates festlegen.
- [ ] Merge-Prozess für Dependabot festlegen.
