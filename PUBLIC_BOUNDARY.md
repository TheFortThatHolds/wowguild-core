# Public source boundary

Only reusable machinery belongs in this repository. Never publish operator data
or a map to a private system. The rule covers code, comments, examples, tests,
documentation, generated files, packages and commit metadata.

Allowed: generic schemas/behavior, adapters, interoperability contracts,
invented test fixtures, placeholder configuration, technical setup instructions
and the public project links required to connect the tools.

Forbidden: personal records, transcripts, real character exports, account email,
private domains/service URLs, local user paths, context graphs, credentials,
encrypted settings, production account/app/client/storage/billing identifiers,
diagnostic artifacts and private-source maps. Non-secret is not permission to
publish. Operators supply their own configuration and credential stores.

Before every public push/release, inspect the exact staged files and diff,
verify fixture/example provenance, check for private values and inspect generated
packages separately. Use public-safe commit attribution. Automated checks do not
replace review. Do not copy private repositories wholesale and scrub afterward.
