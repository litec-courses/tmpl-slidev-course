# GitHub-Organization verwalten

Diese Anleitung gilt für `litec-courses`. Sie richtet sich an Organization Owners. Alle Schritte erfolgen auf GitHub.

## Ziel

Ein **Ruleset** bündelt Schutzregeln für Repositories. Die **Custom Property** `protection_profile` wählt das Profil:

| Profil | Schutz |
| --- | --- |
| `off` | kein Organization Ruleset |
| `pull_request` | Pull Request ohne fremde Approval |
| `reviewed` | Pull Request mit einer Approval |

> `off` entfernt keine anderen Schutzregeln. GitHub kombiniert passende Regeln.

Voraussetzungen: GitHub Team oder Enterprise, passende Owner-Rechte und ein Default Branch.

## 1. Custom Property

Pfad: **Settings → Repository → Custom properties**

1. `protection_profile` als **Single select** anlegen.
2. `off`, `pull_request` und `reviewed` eintragen.
3. **Require this property for all repositories** aktivieren.
4. Defaultwert wählen.
5. **Require explicit user-specified values** deaktiviert lassen.
6. **Allow repository actors to set this property** deaktiviert lassen.

Ohne eigenen Wert gilt der Default. So kann Classroom50 Repositories anlegen.

| Verwendung | Profil |
| --- | --- |
| `litec-courses` | `pull_request` als Default |
| Classroom50-Organization | `off` als Default |
| Pull-Request-Übung | `pull_request` |
| gemeinsam betreute Infrastruktur | `reviewed` |
| Sandbox | `off` |

Bestehende Repositories unter **Set values** zuordnen. `reviewed` braucht eine zweite Person.

## 2. Pull-Request-Schutz

Pfad: **Settings → Repository → Rulesets → New ruleset → New branch ruleset**

1. Name: `pull-request-protection`.
2. Status: **Evaluate**.
3. Ziel: **Repositories matching a filter**.
4. Profile: `pull_request` und `reviewed`.
5. Branch: **Default branch**.
6. Vorschau prüfen.

Aktivieren:

- **Restrict deletions**
- **Require a pull request before merging** mit `0` Approvals
- **Require conversation resolution before merging**
- **Block force pushes**

Keine breite Admin-Bypass-Regel setzen. Notfallzugang auf ein kleines Owner-Team begrenzen. Nutzung dokumentieren.

**Require linear history** braucht Squash Merge oder Rebase Merge. Noch keine Status Checks fordern. Der Pages-Workflow läuft nicht bei Pull Requests.

## 3. Approval-Pflicht

Zweites Branch Ruleset anlegen:

1. Name: `required-review`.
2. Status: **Evaluate**.
3. Filter: `props.protection_profile:reviewed`.
4. Branch: **Default branch**.
5. Pull Request und eine Approval verlangen.

Für `reviewed` gelten beide Rulesets.

## 4. Test und Aktivierung

Je ein Testrepository mit `off`, `pull_request` und `reviewed` verwenden.

- `pull_request`: Push, Force Push, Löschen und offene Conversation prüfen.
- `pull_request`: Merge ohne Approval muss möglich sein.
- `reviewed`: fremde Approval muss nötig sein.
- `off`: Organization Rulesets dürfen unter `/<organization>/<repository>/rules` nicht erscheinen.
- Classroom50: neues Repository muss `off` erben.
- **Rule insights**: erwartete Ereignisse prüfen.

Danach beide Rulesets auf **Active** setzen. Alle Profile erneut prüfen. Die Regeln gelten sofort.

## Profil ändern

Pfad: **Settings → Repository → Custom properties → Set values**

Vor einer Lockerung Grund, Person, Dauer und Rückstellung dokumentieren. Regeln unter `https://github.com/ORGANIZATION/REPOSITORY/rules` prüfen.

Für einzelne Repositories das Profil ändern. Ein Ruleset nur für eine gemeinsame Pause deaktivieren.

## Build-Check ergänzen

Erst nach Unterstützung von Pull Requests:

1. Build bei `pull_request` ausführen.
2. Deployment auf den Default Branch beschränken.
3. Check-Namen aus einem erfolgreichen Pull Request übernehmen.
4. **Require status checks to pass before merging** aktivieren.
5. Zuerst im Evaluate-Modus testen.

## Kontrolle

- `off` jedes Semester prüfen.
- Classroom50-Defaults stichprobenartig prüfen.
- Bypass-Nutzung in **Rule insights** prüfen.
- Änderungen mit Grund und Datum dokumentieren.
- Optional Ruleset-JSON ohne IDs oder interne Details versionieren.

## Quellen

- [Organization Rulesets erstellen](https://docs.github.com/en/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization)
- [Custom Properties verwalten](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)
- [Ruleset-Regeln](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Organization Rulesets verwalten](https://docs.github.com/en/organizations/managing-organization-settings/managing-rulesets-for-repositories-in-your-organization)
- [Classroom50-Architektur](https://github.com/foundation50/classroom50/discussions/21)
