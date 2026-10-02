# WoW Guild Core

A guild-owned coordination tool for independently owned WoW Cores.

The guild deploys this tool into its own Cloudflare account. Players deploy
[WoW Core](https://github.com/TheFortThatHolds/wow-core) into their own accounts
and choose which characters and information to share with the guild.

## What this tool is for

- Guild invitations, membership and officer permissions.
- A unified roster of permission-filtered character views, not a second source
  of character truth.
- Shared guild plans and coordination through the same player-facing companion.
- Revocable connections that do not transfer ownership of personal characters.

Joining a guild never requires handing over a Cloudflare password/API token or
opening a whole personal database. Private conversations and notes are not
guild-visible by default. Leaving revokes future access without deleting the
player's personal Core; retention of already-shared information must be explicit.

## Setup approach

This is software for guilds to offer, not a course, consulting program or hosted
account platform. A guild operator, developer or AI coding agent can deploy and
configure it with their own accounts. Technical setup documentation will specify
the required resources, configuration and player-Core connection contract.

The cloud service must not depend on the guild leader's PC remaining on.

## Current status

Version-1 invitation, membership and guild-planning policy functions with
synthetic tests. The authoritative character/grant schemas and projection kernel
are consumed from a pinned commit of wow-core, not duplicated here. See
[docs/POLICY.md](docs/POLICY.md).

There is no deployable runtime, network authentication, persistent membership,
real federation or installer yet. An existing guild bot can be complemented by
a future scoped adapter; this project does not replace or connect one today.

Development checks (Node.js 22 or later): `npm ci --ignore-scripts --no-audit
--no-fund`, `npm run check`, then `npm test`. The dependency is public and pinned;
these policy tests need no operator credentials, Discord access or model calls.

Read [PLAN.md](PLAN.md), [PUBLIC_BOUNDARY.md](PUBLIC_BOUNDARY.md) and
[SESSION_HANDOFF.md](SESSION_HANDOFF.md) before implementation. Only generic
public-facing code, synthetic fixtures and setup instructions belong here.

## License

MIT; see [LICENSE](LICENSE). The public tool stays freely reusable. Optional
setup/seed offerings must not restrict the rights granted by the code license.
Private-source extraction still requires provenance and privacy review.
