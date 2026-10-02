# WoW Guild Core — public project checkpoint

## 2026-10-02: policy kernel implemented

This section supersedes the planning-only checkpoint below. MIT is approved and
added. Original generic code implements invitation creation, exact-player
acceptance, officer/owner approval, member-only onboarding, invitation revocation,
leaving and narrowly scoped guild-plan permissions. Approval cannot overwrite an
existing/left member and requires a trusted exact-read absence result.

The authoritative contracts/projection kernel are consumed from wow-core commit
50689536f78ac507a643152325dc7586060713c5, merged in player PR #1. Schemas are not
duplicated. Public Git dependency and lockfile use HTTPS; a fresh-cache install
with SSH disabled and no global Git authentication configuration passed.

Verification: all 16 local guild-policy tests passed, including an integrated
join-then-explicitly-share test. The corresponding player suite has 16 passing
tests. Syntax checks and package dry-runs passed. Package output is limited to
license, README, manifest, policy docs and source. CI checks without credentials
or deployment. No private code, records, operator values or existing bot systems
were imported or changed.

LIMITATIONS: functions accept trusted server-adapter inputs; they do not
authenticate a network peer or persist state. Production must exact-read current
membership/grant state and atomically apply transitions. Signing/audience,
rotation, replay/SSRF defenses, cache withdrawal, storage indexes, role promotion,
owner transfer, real onboarding and voice/bot integrations remain future work.
Leaving the pure membership object does not contact a player Core or erase
previously shared data. Existing Discord bots are complements, not replacement
targets. There is no paid seed, checkout or deployment in this repository.

Next: implement authenticated storage adapters for independent player/guild
deployments, with fail-closed network tests and measured platform call budgets.
Do not expose the policy functions as an unauthenticated HTTP API or treat these
tests as real-client/federation evidence. Save progress in this same handoff.

Both first implementation PRs are merged: wow-core #1 and wowguild-core #1.
Their GitHub PR CI checks passed (player run 37063231792, guild run 37063886259).
There are 32 passing synthetic policy tests across the two projects, not an
end-to-end deployment test. Ordinary member onboarding should approve a clear
sharing preset once, not make members select fields again on every sync.

## 2026-10-02: public foundation

Repository: https://github.com/TheFortThatHolds/wowguild-core

This repository was public and empty when inspected. It is the independently
owned guild tool; https://github.com/TheFortThatHolds/wow-core is the player tool.
Both contain only generic public-facing project material.

Added README.md, PLAN.md, AGENTS.md, PUBLIC_BOUNDARY.md, SESSION_HANDOFF.md and
.gitignore. This is a planning/documentation checkpoint, not a runtime release.
No private data, source/configuration, credentials or deployment was imported.
No existing service was changed and no new service was deployed.

Verification: reviewed the six explicitly staged files, checked the diff for
whitespace errors, checked local Markdown links and scanned for personal values,
identifiers, credentials and local paths. These documentation checks passed;
there is no runtime test or deployment claim.

## Historical bootstrap next action

Start PLAN.md stage 1: versioned interoperability contracts and synthetic
permission tests. Coordinate the player-side grant/projection boundary with
wow-core, without creating two authoritative contract definitions.

Before runtime federation, review current official platform documentation and
settle peer authentication, revocation, endpoint restrictions and caching rules.
License selection is resolved: MIT. Private-source extraction still requires
provenance/privacy review. Keep these tools generic; provide technical setup instructions rather
than a teaching program or hosted account platform.

After the empty-repository bootstrap, use branches/checks/PR merges. Update this
same handoff as implementation and verification progress.
