# Technische Details

Diese Datei beschreibt die technische Wartung und Veröffentlichung des Templates. Sie richtet sich vor allem an Lehrkräfte, die ein daraus erzeugtes Kursrepository betreuen.

## Dependabot

[Dependabot](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates) prüft automatisch, ob neuere Versionen der verwendeten Pakete und GitHub Actions verfügbar sind. Die Konfiguration liegt in `.github/dependabot.yml`.

Für dieses Template gelten zwei monatliche, gebündelte Prüfungen:

- Bun-Abhängigkeiten aus `package.json` und `bun.lock`
- verwendete GitHub Actions aus `.github/workflows/`

Updates werden als Pull Request vorgeschlagen und nicht automatisch in `main` übernommen. Vor dem Merge sollen der Pages-Build und die erzeugten Dateien geprüft werden.

Ein aus einem Template erzeugtes Repository ist eine eigenständige Kopie. Spätere Änderungen am Template werden nicht automatisch übertragen. Neue Kursrepositories enthalten die Dependabot-Konfiguration bereits; in älteren Kursrepositories muss sie einmalig ergänzt werden. GitHub unterstützt den textbasierten `bun.lock` für Dependabot-Version-Updates. Weitere Informationen stehen in der [Liste unterstützter Ökosysteme](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories#bun).

## GitHub Actions und GitHub Pages

Der Workflow `.github/workflows/pages.yml` baut und veröffentlicht die Kursmaterialien. Er wird derzeit manuell oder bei einem Push auf `main` gestartet.

Der Build führt folgende Schritte aus:

1. Repository auschecken und Bun einrichten.
2. Abhängigkeiten anhand von `bun.lock` installieren.
3. Chromium für Slidev- und Handout-PDFs bereitstellen.
4. Nur die in `lectures/publish.yml` freigegebenen Materialien bauen.
5. Interaktive Slidev-Decks sowie PDF- und Markdown-Downloads erzeugen.
6. `dist/` als GitHub-Pages-Artefakt hochladen und veröffentlichen.

GitHub Pages verwendet damit bereits fertig erzeugte statische Dateien. Jekyll ist nicht beteiligt. Im Repository muss unter **Settings → Pages → Build and deployment** die Quelle **GitHub Actions** ausgewählt sein. Die offizielle Beschreibung des Ablaufs befindet sich unter [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Speaker Notes und alle Build-Ausgaben sind als öffentlich zu behandeln. Prüfungen, Lösungen und `_temp/` dürfen nicht in `lectures/slides.md` oder `lectures/publish.yml` aufgenommen werden.

## GitHub Education für die Organization

Verifizierte Lehrkräfte können eine für Unterricht oder akademische Forschung verwendete Organization kostenlos auf GitHub Team umstellen. Die Auswahl ist im [GitHub Global Campus Teacher Dashboard](https://education.github.com/globalcampus/teacher) im Abschnitt **Upgrade your academic organizations** zu finden. Dort kann die betreffende Organization über **Upgrade to GitHub Team** ausgewählt und umgestellt werden.

Die Umstellung erfolgt nicht über die regulären Billing-Einstellungen der Organization. Falls der Abschnitt nicht angezeigt wird, sind der aktive Teacher-Status unter [Education benefits](https://github.com/settings/education/benefits) und die Owner-Rolle in der Organization zu prüfen.

## Branches, Pull Requests und Schutz von `main`

Änderungen sollen auf einem kurzen Feature-Branch entstehen und über einen Pull Request nach `main` gelangen. Dadurch bleiben Änderungen, Build-Ergebnisse und Diskussionen nachvollziehbar.

Empfohlene Regeln für `main`:

- Pull Request vor dem Merge verlangen
- offene Diskussionen vor dem Merge auflösen
- Force Pushes und das Löschen von `main` blockieren
- lineare Historie verwenden, wenn ausschließlich Squash- oder Rebase-Merges eingesetzt werden
- bei Einzelbetreuung keine verpflichtende Fremdfreigabe verlangen; bei gemeinsamer Betreuung mindestens eine Freigabe verlangen
- nach Erweiterung des Workflows den Pages-Build als erforderlichen Status Check festlegen

Ein GitHub-Ruleset kann diese Regeln durchsetzen. Repository-Einstellungen werden durch ein Template nicht an neue Repositories weitergegeben. Für mehrere ausgewählte Kursrepositories eignet sich daher ein Organization Ruleset mit einer Custom Property, beispielsweise:

```text
repository_type = lecture
```

Das Ruleset kann mit `props.repository_type:lecture` gezielt nur diese Repositories erfassen. Einrichtung und Werteverwaltung sind unter [Managing custom properties](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization) beschrieben.

Der aktuelle Pages-Workflow läuft noch nicht für Pull Requests. Ein Pages-Build darf deshalb erst nach der geplanten Workflow-Erweiterung als verpflichtender PR-Check eingetragen werden. Das eigentliche Deployment soll weiterhin ausschließlich aus `main` erfolgen.

## TODO

- [ ] Prüfen, ob Theme, Layouts und Publish-Scripts langfristig als versioniertes `litec-slidev`-Package bereitgestellt werden sollen.
- [ ] Festlegen, wie bestehende Kursrepositories einmalig mit `dependabot.yml` und späteren Infrastrukturänderungen versorgt werden.
- [ ] GitHub-Organization-Custom-Property `repository_type` mit dem Wert `lecture` definieren und den betroffenen Repositories zuweisen.
- [ ] Organization Ruleset für `props.repository_type:lecture` entwerfen, testen und dokumentieren.
- [ ] Pages-Workflow um einen Pull-Request-Trigger erweitern.
- [ ] Bei Pull Requests nur Build und Prüfung ausführen; Upload und Deployment weiterhin auf `main` beschränken.
- [ ] Den erfolgreichen Build-Job anschließend als erforderlichen Status Check für `main` konfigurieren.
- [ ] Entscheiden, ob für mehrere Repositories ein zentraler wiederverwendbarer Workflow sinnvoll ist.
- [ ] Prozess für Major-Updates von Slidev und Playwright festlegen, einschließlich visueller Prüfung von Kurs, Demo und PDFs.
- [ ] Festlegen, ob Pull Requests von Dependabot nach erfolgreichem Build manuell oder teilweise automatisiert zusammengeführt werden sollen.
