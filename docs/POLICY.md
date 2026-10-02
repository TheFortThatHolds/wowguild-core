# Guild policy v1

The player repository's pinned `@wow-core/contracts` Git dependency is the single
authoritative schema/projection implementation. This repository adds guild role
and lifecycle policy; it does not duplicate character schemas or projections.
Git dependencies are pinned to an immutable source commit and locked locally.

`src/guild.mjs` performs no network, storage or model operations. It is not a
deployed guild service or an authentication system. Principals, current stored
membership/invitation records, configured guild identity and server clock must
come from a trusted authenticated adapter, never request-body/Discord/model claims.

## Narrow initial roles

| Action | Member | Officer | Owner |
| --- | --- | --- | --- |
| Read guild plans | yes | yes | yes |
| Write guild plans | no | yes | yes |
| Invite/approve/revoke invitation | no | yes | yes |
| Write another player's personal character | no | no | no |

This is a conservative initial kernel, not a settled sharing preset or full
guild administration UI. Role promotion, kicking members, owner transfer and
last-owner protection must be designed before administrative rollout.

Invitation transitions: pending -> accepted by the exact authenticated player
Core -> approved by an active officer/owner -> active member. Expiry, wrong
identity/guild and repeated transitions fail. An approved invitation cannot be
revoked as a substitute for revoking membership. Joining creates no sharing
grant. The player must separately authorize character projections in their Core.

Leaving marks membership inactive and denies subsequent guild actions. A future
coordinator must also withdraw the source sharing grants and clear derived caches
under the disclosed retention policy. This kernel alone does not contact personal
Cores, erase caches, invalidate sessions or make old disclosures disappear.

## Persistence and concurrent calls

Returned transitions are proposed state changes. The future storage adapter must
read current state and atomically compare/update it; approving an invitation and
creating its membership are one transaction. Never let two requests approve the
same old invitation snapshot or resurrect a left/revoked record from a cache.
Approval requires an exact target-membership read returning `null`; missing read
results or existing active/left memberships fail with `membership_conflict`.
Re-inviting an existing/left member needs explicit version/rejoin semantics.

## Supplement existing tools

An existing Discord bot or guild website can be connected through a future
permission-limited adapter. Do not replace that bot or assume its private server
protocol. Blizzard API observations do not prove Core ownership or grant guild
membership. A Discord mention is not personal data-sharing consent.

No Discord integration, Blizzard client, public network endpoint, persistent
database, signed peer authentication or remote-fetch capability is implemented.
The tests establish policy behavior only; real federation remains a later gate.
