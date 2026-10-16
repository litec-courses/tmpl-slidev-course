# GitHub-Organization verwalten

Diese Anleitung beschreibt gemeinsame Einstellungen für die GitHub-Organization `litec-courses`. Sie richtet sich an Organization Owners und wird nicht automatisch auf GitHub angewendet.

## Ziel

Der Default Branch ausgewählter Repositories soll durch Organization Rulesets geschützt werden. Ein **Ruleset** ist eine Sammlung von Regeln, die GitHub für passende Repositories und Branches gemeinsam durchsetzt.

Die Zuordnung erfolgt über eine Custom Property. **Custom Properties** sind strukturierte Metadaten eines Repositories. Das Schutzprofil beschreibt den gewünschten Workflow unabhängig davon, ob das Repository einen Kurs, ein Template, Infrastruktur, eine Übung oder eine Sandbox enthält:

| `protection_profile` | Verhalten |
| --- | --- |
| `off` | kein Organization Ruleset |
| `pull_request` | Pull Request erforderlich, keine fremde Approval |
| `reviewed` | Pull Request und mindestens eine Approval erforderlich |

Die Property soll verpflichtend sein und einen zur Organization passenden Defaultwert erhalten. **Require explicit user-specified values** bleibt deaktiviert, damit Apps wie Classroom50 Repositories anlegen können, ohne die Property beim Erstellen mitsenden zu müssen. Solche Repositories erben den Defaultwert.

> `off` entfernt keine zusätzlichen Repository Rulesets oder klassischen Branch-Protection-Regeln. GitHub fasst alle zutreffenden Regeln zusammen; eine Regel kann durch ein weiteres Ruleset nur verschärft, nicht gelockert werden.

## Voraussetzungen

- Die Organization verwendet GitHub Team oder GitHub Enterprise.
- Die ausführende Person ist Organization Owner oder besitzt eine Rolle mit der Berechtigung zur Verwaltung von Organization Rulesets.
- Der Default Branch der betroffenen Repositories ist festgelegt.

Organization Rulesets für mehrere Repositories stehen laut GitHub mit Team- und Enterprise-Plänen zur Verfügung.

## 1. Custom Property anlegen

In der jeweiligen Organization unter **Settings → Repository → Custom properties**:

1. `protection_profile` als **Single select** anlegen.
2. Die Werte `off`, `pull_request` und `reviewed` eintragen.
3. **Require this property for all repositories** aktivieren.
4. Einen Defaultwert gemäß der Organization wählen.
5. **Require explicit user-specified values** nicht aktivieren.
6. **Allow repository actors to set this property** nicht aktivieren. Profile sollen Organization Owners verwalten.

Empfohlene Defaultwerte:

| Organization | Defaultwert | Begründung |
| --- | --- | --- |
| `litec-courses` | `pull_request` | neue Kursrepositories standardmäßig schützen, ohne eine zweite Person vorauszusetzen |
| von Classroom50 verwaltete Klassen-Organization | `off` | automatisch erzeugte Assignments erlauben zunächst direkte Pushes |

Anschließend im Tab **Set values** bestehende Repositories gesammelt zuordnen. Typische Profile:

| Verwendung | Profil |
| --- | --- |
| gewöhnliches Classroom50-Assignment | `off` |
| Assignment für eine Pull-Request-Übung | `pull_request` |
| allein betreuter Kurs oder Template | `pull_request` |
| gemeinsam betreute Infrastruktur | `reviewed` |
| Sandbox | `off` |

Bei `reviewed` kann der Autor die eigene Pull Request nicht selbst freigeben. Dieses Profil eignet sich daher nicht für ein Repository, das nur von einer Person betreut wird.

## 2. Gemeinsamen Pull-Request-Schutz anlegen

Unter **Settings → Repository → Rulesets → New ruleset → New branch ruleset**:

1. Den Namen `pull-request-protection` verwenden.
2. **Enforcement status** zunächst auf **Evaluate** setzen. In diesem Modus protokolliert GitHub die Wirkung, ohne Änderungen zu blockieren.
3. Unter **Target repositories** die Option **Repositories matching a filter** wählen.
4. Über **Select by filter** die Property `protection_profile` mit den Werten `pull_request` und `reviewed` auswählen. Vor dem Speichern in der Vorschau prüfen, dass beide Profile erfasst werden.
5. Unter **Target branches** den **Default branch** einschließen. Dadurch funktioniert die Regel unabhängig davon, ob der Branch `main` oder anders heißt.
6. Keine breite Bypass-Regel für Repository Admins vergeben. Falls ein Notfallzugang nötig ist, nur ein kleines Owner-Team aufnehmen und den Bypass dokumentieren.

Folgende Regeln aktivieren:

- **Restrict deletions**
- **Require a pull request before merging**
- **Require conversation resolution before merging**
- **Block force pushes**

Bei **Require a pull request before merging** `0` verpflichtende Approvals verwenden. Die Approval wird ausschließlich durch das zweite Ruleset für `reviewed` ergänzt.

**Require linear history** nur aktivieren, wenn die betroffenen Repositories Squash Merge oder Rebase Merge erlauben. Andernfalls können Pull Requests nicht regelkonform gemergt werden.

Noch keine erforderlichen Status Checks eintragen: Der aktuelle Pages-Workflow wird nur manuell und bei Pushes auf `main` ausgeführt. Ein Check darf erst verpflichtend werden, nachdem der Workflow auch bei Pull Requests einen reinen Build ohne Deployment ausführt.

## 3. Approval für gemeinsam betreute Repositories ergänzen

Ein zweites Branch Ruleset anlegen:

1. Den Namen `required-review` verwenden.
2. **Enforcement status** zunächst auf **Evaluate** setzen.
3. Nur Repositories mit `props.protection_profile:reviewed` erfassen.
4. Den **Default branch** einschließen.
5. **Require a pull request before merging** aktivieren und eine verpflichtende Approval einstellen.

Beide Rulesets gelten gemeinsam. Ein Repository mit `reviewed` erhält daher sowohl den allgemeinen Pull-Request-Schutz als auch die Approval-Pflicht.

## 4. Wirkung prüfen und aktivieren

1. Testrepositories mit `off`, `pull_request` und `reviewed` verwenden.
2. Bei `pull_request` einen direkten Push auf den Default Branch, einen Force Push und das Löschen des Branches in einer ungefährlichen Testsituation auswerten.
3. Eine Pull Request erstellen und prüfen, ob offene Conversations den Merge blockieren, aber keine Approval verlangt wird.
4. Bei `reviewed` zusätzlich prüfen, dass eine Approval durch eine andere Person erforderlich ist.
5. Bei `off` prüfen, dass keines der beiden Organization Rulesets unter `/<organization>/<repository>/rules` erscheint.
6. In einer Classroom50-Testorganization ein Assignment erzeugen und prüfen, ob das neue Repository den Defaultwert `off` geerbt hat.
7. Unter **Settings → Repository → Rule insights** die Ereignisse aus dem Evaluate-Modus kontrollieren.
8. Erst danach beide Rulesets auf **Active** setzen.

Nach der Aktivierung jedes Profil erneut vollständig prüfen. Organization Rulesets gelten sofort für alle Repositories, die den Filter erfüllen.

## Profil eines Repositories ändern

Organization Owners öffnen **Settings → Repository → Custom properties → Set values**, wählen das Repository und setzen `protection_profile` auf den gewünschten Wert.

Vor einer Lockerung des Profils sind zu dokumentieren:

- Grund und verantwortliche Person
- erwartete Dauer der Ausnahme
- Termin für die Rückstellung auf `pull_request` oder `reviewed`

Danach unter `https://github.com/ORGANIZATION/REPOSITORY/rules` prüfen, welche Organization- und Repository-Regeln gelten. Für eine Pull-Request-Übung kann eine Auswahl von Classroom50-Assignments gesammelt von `off` auf `pull_request` und anschließend wieder zurückgestellt werden.

Ein Ruleset nur deaktivieren, wenn der Schutz für alle erfassten Repositories gleichzeitig ausgesetzt werden soll. Für einzelne Projekte ist ausschließlich das Profil vorgesehen.

## Erweiterung um Build-Checks

Wenn der Pages-Workflow Pull Requests unterstützt:

1. Den Build-Job bei `pull_request` ausführen.
2. Upload und Deployment weiterhin auf Pushes zum Default Branch beschränken.
3. Den exakten Check-Namen aus einem erfolgreichen Pull Request übernehmen.
4. **Require status checks to pass before merging** in `pull-request-protection` aktivieren und diesen Check hinzufügen.
5. Die Änderung wieder zuerst im Evaluate-Modus beziehungsweise an Testrepositories prüfen.

## Regelmäßige Kontrolle

- Repositories mit `protection_profile = off` mindestens semesterweise prüfen.
- Stichprobenartig prüfen, ob automatisch erstellte Classroom50-Repositories den erwarteten Defaultwert geerbt haben.
- Bypass-Nutzung in **Rule insights** prüfen.
- Änderungen am Ruleset mit Grund und Datum dokumentieren.
- Exportiertes Ruleset-JSON nach wesentlichen Änderungen versionieren, falls die Organization-Konfiguration später als Code verwaltet werden soll. Exporte vor dem Commit auf IDs oder unerwünschte Organization-Details prüfen.

## Quellen

- [Creating rulesets for repositories in your organization](https://docs.github.com/en/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization)
- [Managing custom properties for repositories in your organization](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)
- [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Managing rulesets for repositories in your organization](https://docs.github.com/en/organizations/managing-organization-settings/managing-rulesets-for-repositories-in-your-organization)
- [Classroom50: architecture overview](https://github.com/foundation50/classroom50/discussions/21)
