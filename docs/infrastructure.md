# GitHub-Organization verwalten

Diese Anleitung gilt für `litec-courses`. Sie richtet sich an Organization Owners. Alle Schritte erfolgen auf GitHub.

## Ziel

Ein **Ruleset** bündelt Schutzregeln für Repositories. Die **Custom Property** `protection_profile` wählt das Profil:

| Profil | Schutz |
| --- | --- |
| `off` | kein Organization Ruleset |
| `pull_request` | Pull Request ohne fremde Approval |
| `review_required` | Pull Request mit einer Approval |

> `off` entfernt keine anderen Schutzregeln. GitHub kombiniert passende Regeln.

Voraussetzungen: GitHub Team (Education) oder Enterprise, passende Owner-Rechte und ein Default Branch.

## 1. Custom Property

Organization: **Settings → Custom properties**

1. `protection_profile` als **Single select** anlegen.
2. `off`, `pull_request` und `review_required` eintragen.
3. **Require this property for all repositories** aktivieren.
4. Für die Einrichtung zunächst `off` als Default wählen.
5. **Require explicit user-specified values** deaktiviert lassen.
6. **Allow repository actors to set this property** deaktiviert lassen.

Ohne eigenen Wert gilt der Default. So kann Classroom50 Repositories anlegen.

| Verwendung | Zielprofil |
| --- | --- |
| `litec-courses` | `pull_request` als späterer Default |
| Classroom50-Organization | `off` als Default |
| Pull-Request-Übung | `pull_request` |
| gemeinsam betreute Infrastruktur | `review_required` |
| Sandbox | `off` |

Bestehende Repositories unter **Set values** zuordnen. `review_required` braucht eine zweite Person.

## 2. Pull-Request-Schutz

Organization: **Settings → Repository → Rulesets → New ruleset → New branch ruleset**

1. Name: `pull-request-protection`.
2. Status: **Active**.
3. Ziel: **Repositories matching a filter**.
4. Filter: `-props.protection_profile:off`.
5. Branch: **Default branch**.
6. Vorschau prüfen.

Aktivieren:

- **Restrict deletions**
- **Require a pull request before merging** mit `0` Approvals
- **Require conversation resolution before merging**
- **Require linear history**
- **Block force pushes**

Keine breite Admin-Bypass-Regel setzen. Notfallzugang auf ein kleines Owner-Team begrenzen. Nutzung dokumentieren.

Unter **Require a pull request before merging → Additional settings** bei **Allowed merge methods** nur **Squash** wählen. Das passt zu **Require linear history**.

**Require status checks to pass** aktivieren:

- Unter **Add checks** den Jobnamen `build` manuell eintragen.
- **Require branches to be up to date before merging** zunächst deaktiviert lassen.
- **Do not require status checks on creation** aktivieren.

Organization Rulesets schlagen vorhandene Checks nicht automatisch vor.

## 3. Approval-Pflicht

Zweites Branch Ruleset anlegen:

1. Name: `required-review`.
2. Status: **Active**.
3. Filter: `props.protection_profile:review_required`.
4. Branch: **Default branch**.
5. Pull Request und eine Approval verlangen.

Für `review_required` gelten beide Rulesets.

## 4. Test und Aktivierung

> [!IMPORTANT]
> GitHub Team bietet keinen Evaluate-Modus. Deshalb bleibt der Default während der Einrichtung auf `off`. Zuerst wird nur ein Testrepository geschützt.

Einem Testrepository nacheinander `pull_request` und `review_required` zuweisen.

- `pull_request`: Push, Force Push, Löschen und offene Conversation prüfen.
- `pull_request`: Merge ohne Approval muss möglich sein.
- `review_required`: fremde Approval muss nötig sein.
- `off`: Organization Rulesets dürfen unter `/<organization>/<repository>/rules` nicht erscheinen.
- Classroom50: neues Repository muss `off` erben.

Danach echte Repositories zuordnen. Für `litec-courses` kann nun `pull_request` zum Default werden. Alle Profile erneut prüfen. Änderungen gelten sofort.

## Profil ändern

Organization: **Settings → Custom properties → Set values**

Vor einer Lockerung Grund, Person, Dauer und Rückstellung dokumentieren. Repository: Regeln unter `https://github.com/ORGANIZATION/REPOSITORY/rules` prüfen.

Für einzelne Repositories das Profil ändern. Ein Ruleset nur für eine gemeinsame Pause deaktivieren.

## In eine andere Organization übertragen

1. Quelle: **Settings → Repository → Rulesets**.
2. Ruleset öffnen und über `…` als JSON exportieren.
3. Ziel: **Settings → Repository → Rulesets → New ruleset → Import a ruleset**.
4. JSON prüfen und Ruleset erstellen.

> [!IMPORTANT]
> Zuerst `protection_profile` mit denselben Werten in der Ziel-Organization anlegen. Property-Werte, Repository-Einstellungen und organisationsspezifische Bypass-IDs werden nicht übertragen.

## Kontrolle

- `off` jedes Semester prüfen.
- Classroom50-Defaults stichprobenartig prüfen.
- Änderungen mit Grund und Datum dokumentieren.
- Optional Ruleset-JSON ohne IDs oder interne Details versionieren.

## Quellen

- [Organization Rulesets erstellen](https://docs.github.com/en/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization)
- [Custom Properties verwalten](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)
- [Ruleset-Regeln](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)
- [Organization Rulesets verwalten](https://docs.github.com/en/organizations/managing-organization-settings/managing-rulesets-for-repositories-in-your-organization)
- [Classroom50-Architektur](https://github.com/foundation50/classroom50/discussions/21)
