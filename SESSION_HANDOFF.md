# WoW Guild Core — public project checkpoint

## 2026-10-02: staged runtime execution begins in player Core

Execution track is M1 player storage/sync, M2 secure provisioning/member sign-in/
OAuth, M3 guild persistent membership/plans, M4 authenticated federation,
M5 public full collectors/sheets/companion/voice, M6 separate GM collector and
data-first addon adapters, M7 operator/real-client release gates.

Player M1 first slice is original generic implementation: server-mapped hashed
machine credentials, per-Core SQLite Durable Objects, bounded canonical roster,
initial validated snapshots with second names, automatic empty template modules,
stale/idempotency handling, manual notes preserved and durable mutation caps.
Locally tested with actual Cloudflare Miniflare runtime and restart/concurrency/
isolation, plus SQLite query/index instrumentation at 500 synthetic characters.
No production deployment, private-source import, real game/voice or full allowed
data coverage claim. See player docs/RUNTIME.md for limits and remaining gates.

Guild code remains unchanged, including the authoritative immutable contract pin.
All 16 guild policy regressions passed. Its runtime, human identity, actual
provisioning, secure peer transport, GM collector and adapters remain unbuilt.
Next: secure player provisioning then guild atomic membership/planning storage.
Never use player pairing credentials as guild/member/officer authorization.

## 2026-10-02: post-join scope and existing-addon coexistence

The guild's recruitment/admission process is out of scope. This tool serves
existing guild members; current Core invitation/membership policy is only the
software-access relationship. Do not implement an in-game joining/recruitment
tool based on earlier wording. Personal and GM guild sync are separate tools
and data paths, even if packaging/transport is shared. GM guild collection and
administrative actions are also separate concerns.

Complement existing guild/raid/loot addons and bots. Optional data adapters must
be allowlisted, versioned, bounded, provenance/freshness-aware and privacy-gated;
no wholesale SavedVariables import or replacement of existing workflows. Player
docs/ADDON_INTEROP.md is the authoritative research/design. No compatibility is
claimed from source inspection alone. Current policy code/dependency is unchanged.

CurseForge author submission and catalog API access are separate. The API is not
needed for current local addon interoperability; its caching/key-sharing/quotas
and distribution terms require review for any future catalog/download feature.
No form was submitted, terms accepted, addon installed/modified, third-party code
copied, actual guild data collected or new service deployed. Next implementation
gate remains authenticated bounded storage before real adapters/federation.

Verification: all 32 existing local policy tests, both syntax checks and package
dry-runs passed. Source policy code was not changed; these are regression checks,
not addon coexistence, CurseForge approval or real-client integration evidence.

CurseForge catalog lookup is deferred separate addon-builder research tooling,
not a runtime Guild Core feature or source of player state. This distinction is
preserved in player docs/ADDON_INTEROP.md; no API access is enabled.

## 2026-10-02: guild-agnostic optional member hosting

Latest requirements supersede mandatory independent Cloudflare accounts below.
Members may self-host or choose a distinct logical member Core hosted by the
guild operator. Hosting is optional, never one shared owner account. Configure
any guild/game/channel/region/realm. Disclose operator access to server-stored
data; test tenant isolation, budgets, export/migration and departure retention
before rollout. See the player repository's docs/HOSTING.md for the single
authoritative hosting design.

Blizzard's official Retail/Classic references list guild profile, roster,
activity and achievements, with no documented GM-only permission. Protected
member data requires that member's own wow.profile authorization, not GM rank.
Hosted members do not need personal developer clients; host app credentials and
member authorization are distinct. Public API observations alone cannot claim
characters or create authorized memberships. Coverage is game/namespace-specific;
Forever beta/release coverage is not verified. See player docs/BLIZZARD_DATA.md.

Documentation/design change only: policy code and pinned contract dependency are
unchanged, with 16 synthetic tests in each repository. No provisioning, data
collector, multi-tenant auth/storage, migration, Discord adapter or deployment
has been built. Next: authenticated storage adapters with exact identity mapping,
cross-tenant denial tests and bounded platform call budgets. Update this same
handoff as those gates are implemented and verified.

Verification for this checkpoint: 32 local tests, both syntax checks and both
package dry-runs passed. Reviewed public diffs/package file lists; local Markdown
links, whitespace and private-value scans passed. No runtime service was changed.

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
