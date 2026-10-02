# Guild tool implementation plan

## Ownership contract

The guild operator owns the guild Cloudflare deployment. Each player owns their
personal deployment in a separate Cloudflare account. Joining authorizes selected
information/actions; it does not transfer characters or reveal infrastructure
credentials. The guild tool is separate from the
[player tool](https://github.com/TheFortThatHolds/wow-core).

Offer software and technical setup instructions. Operators may use their own
skills, a developer or an AI coding agent. A training course, hosted account
platform or compulsory self-service wizard is out of scope.

## Stages

### 0. Public foundation — current checkpoint

- [x] Establish the public repository, ownership boundary and durable plan.
- [x] Keep public artifacts generic and exclude personal data/configuration.
- [x] MIT license selected for the generic public tool.

### 1. Contract and authorization tests, before network access

- [x] Define versioned player/guild interoperability contracts jointly with
  wow-core. Give each definition one authoritative home, not drifting copies.
- [x] Define invitations, approvals, membership roles and scoped sharing grants.
- [x] Reference stable Core identities independent of a mutable domain/key.
- [x] Default to no character access until sharing is explicitly granted.
- [x] Add synthetic tests for owner/member/officer/outsider and game isolation.

Gate: invented players/guilds prove denied access, scoped reads, separate planning
writes and no transfer of character ownership. A guild name in a snapshot cannot
authorize membership. No keys or production networking needed for these tests.

### 2. Independently deployed guild Core

- [ ] Implement authenticated membership and shared guild planning state.
- [ ] Implement bounded guild roster indexes and permission-filtered views.
- [ ] Preserve source Core/character identity, channel and observation freshness.
- [ ] Report unavailable/stale sources honestly; never invent current facts.
- [ ] Review current official deployment/auth APIs and document operator setup.

Gate: guild state persists with all local PCs off; unauthorized users cannot
read/write it. Guild state cannot overwrite a player's personal state. Interactive
queries do not scan every record body or fan out to every player without bounds.

### 3. Real federation with personal Cores

- [ ] Authenticate peers and scope every request at the source personal Core.
- [ ] Specify expiry/rotation/replay defenses, revocation and approved endpoints.
- [ ] Add SSRF defenses; an invite cannot turn the guild into an arbitrary proxy.
- [ ] Define explicit cache/history retention and withdrawal behavior.
- [ ] Add narrow guild-plan actions without general personal-Core write access.

Gate: two independently configured personal Cores and one guild Core interoperate;
an outsider, forged role, widened grant, wrong audience or revoked member cannot
read private data. Previously disclosed content is not falsely promised erased.
Network/security failures remain fail-closed and observable.

### 4. Companion integration and usable onboarding

- [ ] Integrate approved guild reads/actions behind the player's existing voice.
- [ ] Enforce the same server permissions on every tool, regardless of prompts.
- [ ] Document deploy/configure/connect flows for operators and coding agents.
- [ ] Test install, pair, `/wowcore sync`, invitation, sharing and leaving.
- [ ] Meter optional voice/analysis with explicit payer and hard allowances.

Gate: guilds can offer the tools without receiving a player's Cloudflare keys or
manually constructing each sheet. A member sees one companion, retains private
state on leaving and cannot spend an unlimited shared inference budget.

## Pending rollout decisions

- Any private-source extraction permissions and provenance/privacy review.
- Initial sharing preset, officer rights and shared-history/cache retention.
- Authentication/federation mechanisms after platform documentation review.
- Optional inference payer and hard default allowances.

These decisions do not block generic contracts and synthetic tests. They must
not be silently resolved in favor of broader data exposure or shared billing.
