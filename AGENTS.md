# WoW Guild Core builder rules

Read PUBLIC_BOUNDARY.md, PLAN.md and SESSION_HANDOFF.md before editing.

- This repository builds the guild tool. The separate wow-core repository builds
  the player tool. Neither requires the project author's private infrastructure.
- The guild owns its deployment, memberships and shared plans. Players own their
  deployments, characters and private state. Guild access is a revocable grant,
  never ownership or an infrastructure credential.
- Provide software and technical operator setup instructions, not a course,
  consulting program or hosted account platform.
- No personal data, secrets, production IDs, private domains, account email,
  local user paths, real exports, context graphs or private-source maps in any
  public artifact. Synthetic tests only. Review the staged diff before pushing.
- Guild names observed in an addon export are not membership proof. Use
  authenticated invitations and approval until an alternative is verified.
- Enforce roles, membership, character scope and field scope outside the model.
  A member/officer cannot use a guild credential to read a whole personal Core.
- Guild views are attributed, freshness-aware projections of canonical player
  records, not a competing character database. Keep beta/release channels apart.
- Define authenticated peers, key rotation, replay protection, revocation,
  approved endpoints, SSRF defenses and cache retention before network federation.
- Shared planning permissions do not grant writes to another player's personal
  character facts, notes or observations. Every voice/background tool is gated.
- Do not retrieve a full character record and filter it only in the browser/model.
  Filtering happens at the personal Core before information leaves it.
- Bound reads, pagination, fan-out and platform call counts; maintenance is
  explicit, capped, versioned and resumable. Add scale/call-budget regressions.
- Keep sync/coordination deterministic. Optional inference is separately capped;
  never fall back to the author's keys/billing. Document embedding costs too.
- Cloud operations cannot require an always-on guild leader/player PC. Local
  companion activity is separate from the hosted coordination service.
- Fetch before editing, preserve other work, inspect scripts before running them,
  use branches/checks/PR merges after bootstrap and save the handoff as you go.
- Do not deploy merely to prepare the checkout. Do not bulk-copy private code or
  choose a reusable-code license on the owner's behalf. Resolve provenance first.
- Never claim working membership, security or onboarding based on docs or mocks;
  record actual tests and remaining limitations.
