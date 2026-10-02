# WoW Guild Core builder rules

Read PUBLIC_BOUNDARY.md, PLAN.md and SESSION_HANDOFF.md before editing.

- This repository builds the guild tool. The separate wow-core repository builds
  the player tool. Neither requires the project author's private infrastructure.
- The guild owns its deployment, memberships and shared plans. Players choose
  self-owned deployments or optional guild-hosted member Cores, each with a
  distinct logical identity and canonical records. Guild application access is
  a revocable grant, never ownership or an infrastructure credential. Disclose
  that an infrastructure operator can technically access hosted member data.
- Stay guild-agnostic: configure guild/game/channel/region/realm; never hardcode
  a guild or require the project author's accounts. Hosting location does not
  grant Blizzard access or reduce permitted member addon sync coverage.
- This is post-join tooling: no recruitment or in-game guild admission workflow.
  Invitations authorize Core access, not membership in the actual WoW guild.
- Complement existing guild/raid/loot addons through optional reviewed data
  adapters. Keep GM guild sync separate from the GM's personal character sync.
  No whole addon database imports or automatic replacement of existing tools.
- Provide software and technical operator setup instructions, not a course,
  consulting program or centrally operated account platform. Guild-managed
  hosting is optional and needs tenant isolation, export and retention tests.
- No personal data, secrets, production IDs, private domains, account email,
  local user paths, real exports, context graphs or private-source maps in any
  public artifact. Synthetic tests only. Review the staged diff before pushing.
- Guild names observed in an addon export are not membership proof. Use
  authenticated invitations and approval until an alternative is verified.
- Public Blizzard roster entries are unclaimed observations, not consent or
  authenticated owners. GM rank is not protected member-account authorization.
- In hosted mode, the server maps each session/pair/OAuth/job to the exact
  member Core. Caller-selected Core IDs, Discord roles and model hints cannot
  cross that boundary. See the player repository's docs/HOSTING.md.
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
