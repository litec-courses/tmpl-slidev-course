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

`.github/workflows/pages.yml` ruft den fest auf `v0.2.0` gepinnten Workflow aus [`course-tooling`](https://github.com/litec-courses/course-tooling) auf. Er läuft bei Pull Requests, bei Pushes auf `main` und manuell, installiert Bun und Chromium und baut die Freigaben aus `lectures/publish.yml`.

Pull Requests bauen und prüfen nur. Pushes auf `main` und manuelle Läufe auf `main` veröffentlichen Decks, Folien-PDFs und Begleitblätter als Markdown aus `dist/`.

Repository: **Settings → Pages → Build and deployment → GitHub Actions**. Jekyll wird nicht verwendet. Siehe [GitHub Pages mit eigenem Workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Workflow mit Docker prüfen:

```bash
docker run --rm -v "$PWD:/repo:ro" -w /repo rhysd/actionlint:latest -color .github/workflows/pages.yml
```

Der Befehl braucht Docker. Keine Ausgabe bedeutet: `actionlint` hat keine Probleme gefunden.

> [!WARNING]
> Pages-Builds sind öffentlich. `--without-notes` schließt Speaker Notes aus. Prüfungen, Lösungen und `_temp/` nie in `lectures/slides.md` oder `lectures/publish.yml` aufnehmen.

## Branch-Schutz

Änderungen per Feature-Branch und Pull Request nach `main` bringen. Templates übertragen keine Repository-Einstellungen.

Der Pages-Build kann als erforderlicher Pull-Request-Check dienen. Deployments bleiben auf `main` beschränkt. Die gemeinsame Einrichtung ist im Repository [`course-tooling`](https://github.com/litec-courses/course-tooling/blob/main/docs/github-organization.md) dokumentiert. Theme und Workflow werden nur durch einen bewusst geprüften Versions-Pin aktualisiert.
