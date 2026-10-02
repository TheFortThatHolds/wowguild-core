# WoW Guild Core

A guild-agnostic coordination tool connecting members' WoW Cores.

The guild deploys this tool into its own Cloudflare account. Players can deploy
[WoW Core](https://github.com/TheFortThatHolds/wow-core) themselves or opt into
member spaces hosted by a willing guild operator, without opening Cloudflare.
Either way, they choose which characters and information to share. Configure
the guild, game/channel, region and realm; there is no built-in guild identity.

This tool is for people who have already joined their guild through its existing
process. Core access invitations are not recruitment or in-game guild invites.
Existing guild, raid and loot addons retain their jobs; optional data adapters
are planned, not implemented. See the
[addon interoperability design](https://github.com/TheFortThatHolds/wow-core/blob/main/docs/ADDON_INTEROP.md).

## What this tool is for

- Core access invitations and officer permissions for existing guild members.
- A unified roster of permission-filtered character views, not a second source
  of character truth.
- Shared guild plans and coordination through the same player-facing companion.
- Revocable connections that do not transfer ownership of personal characters.

Joining a guild never requires handing over a Cloudflare password/API token or
opening a whole personal database. Private conversations and notes are not
guild-visible by default. Leaving revokes future access without deleting the
player's personal Core; retention of already-shared information must be explicit.

Hosted mode keeps member spaces separate in the application, but the operator
controls the server and can technically access stored data. Disclose that before
onboarding and provide an export/migration path. Hosting alone does not reduce
permitted member sync data or authorize protected Blizzard account access.
See the authoritative player-side [hosting design](https://github.com/TheFortThatHolds/wow-core/blob/main/docs/HOSTING.md)
and [Blizzard data notes](https://github.com/TheFortThatHolds/wow-core/blob/main/docs/BLIZZARD_DATA.md).

## Setup approach

This is software for guilds to offer, not a course, consulting program or
centrally operated account platform. A guild operator, developer or AI coding
agent can configure it with their own accounts. Technical setup documentation
will specify resources, configuration and the player-Core connection contract.

The cloud service must not depend on the guild leader's PC remaining on.

## Current status

Version-1 invitation, membership and guild-planning policy functions with
synthetic tests. The authoritative character/grant schemas and projection kernel
are consumed from a pinned commit of wow-core, not duplicated here. See
[docs/POLICY.md](docs/POLICY.md).

There is no deployable runtime, network authentication, persistent membership,
real federation, hosted member provisioning or installer yet. An existing guild
bot can be complemented by a future scoped adapter; this project does not replace
or connect one today.

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
