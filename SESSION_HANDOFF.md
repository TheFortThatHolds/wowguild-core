# WoW Guild Core — public project checkpoint

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

## Next action

Start PLAN.md stage 1: versioned interoperability contracts and synthetic
permission tests. Coordinate the player-side grant/projection boundary with
wow-core, without creating two authoritative contract definitions.

Before runtime federation, review current official platform documentation and
settle peer authentication, revocation, endpoint restrictions and caching rules.
License selection is still needed before private-source extraction or a reusable
release. Keep these tools generic; provide technical setup instructions rather
than a teaching program or hosted account platform.

After the empty-repository bootstrap, use branches/checks/PR merges. Update this
same handoff as implementation and verification progress.
