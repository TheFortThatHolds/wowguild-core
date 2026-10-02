import test from 'node:test';
import assert from 'node:assert/strict';
import { ContractError, CONTRACT_VERSION, createGrant, projectCharacter } from '@wow-core/contracts';
import { authorizeGuildAction, createInvitation, acceptInvitation,
  approveInvitation, revokeInvitation, leaveGuild } from '../src/guild.mjs';

const now = 10000;
const guildCoreId = 'guild-example-a';
const leader = { kind: 'player', coreId: 'core-example-leader' };
const newcomer = { kind: 'player', coreId: 'core-example-new' };
function membership(role = 'owner') {
  return { version: CONTRACT_VERSION, id: 'membership-example', guildCoreId,
    playerCoreId: leader.coreId, role, state: 'active', approvedAt: now - 100, leftAt: null };
}
function invite() {
  return createInvitation({ principal: leader, membership: membership(), guildCoreId, now,
    input: { id: 'invitation-example', playerCoreId: newcomer.coreId, expiresAt: now + 1000 } });
}
function accepted() { return acceptInvitation({ principal: newcomer, invitation: invite(), now }); }
function approve(options = {}) {
  return approveInvitation({ principal: leader, membership: membership(),
    invitation: accepted(), existingMembership: null, now, ...options });
}
function action(options = {}) {
  return authorizeGuildAction({ principal: leader, membership: membership(),
    guildCoreId, action: 'plans.read', now, ...options });
}
const denied = (fn, code) => assert.throws(fn, error => error instanceof ContractError
  && (!code || error.code === code));

test('one authoritative contract dependency, supported version 1', () => {
  assert.equal(CONTRACT_VERSION, 1);
});
test('officers invite, verified intended player accepts, officer approves member only', () => {
  const result = approve({ membership: membership('officer') });
  assert.equal(result.invitation.state, 'approved');
  assert.equal(result.membership.playerCoreId, newcomer.coreId);
  assert.equal(result.membership.role, 'member');
  assert.equal(result.membership.state, 'active');
  assert.equal(Object.hasOwn(result, 'grant'), false);
});
test('invitation id does not authorize a different player to accept', () => {
  denied(() => acceptInvitation({ principal: leader, invitation: invite(), now }), 'wrong_player');
  denied(() => acceptInvitation({ principal: { kind: 'guild', coreId: newcomer.coreId },
    invitation: invite(), now }), 'wrong_player');
});
test('approval without explicit player acceptance fails', () => {
  denied(() => approve({ invitation: invite() }), 'acceptance_required');
});
test('repeated acceptance or approval fails, preserving single transition semantics', () => {
  denied(() => acceptInvitation({ principal: newcomer, invitation: accepted(), now }),
    'invitation_not_pending');
  denied(() => approve({ invitation: approve().invitation }), 'acceptance_required');
});
test('approval requires an exact-read absence result and cannot overwrite any membership', () => {
  for (const existingMembership of [undefined, membership(),
    { ...membership(), state: 'left', leftAt: now }]) {
    denied(() => approve({ existingMembership }), 'membership_conflict');
  }
});
test('members cannot invite, approve, or revoke invitations', () => {
  for (const operation of ['members.invite', 'members.approve', 'members.revokeInvitation']) {
    denied(() => action({ membership: membership('member'), action: operation }), 'action_denied');
  }
});
test('role comes from trusted stored membership, not invitation input', () => {
  denied(() => createInvitation({ principal: leader, membership: membership(), guildCoreId, now,
    input: { id: 'example', playerCoreId: newcomer.coreId, expiresAt: now + 1, role: 'owner' } }));
});
test('outsiders, absent principal and another guild cannot use a stored membership', () => {
  denied(() => action({ principal: newcomer }), 'wrong_player');
  denied(() => action({ principal: undefined }), 'wrong_player');
  denied(() => action({ guildCoreId: 'guild-example-b' }), 'wrong_guild');
  denied(() => approve({ membership: { ...membership(), guildCoreId: 'guild-example-b' } }), 'wrong_guild');
});
test('ordinary members read guild plans; planning writes require officer or owner', () => {
  assert.equal(action({ membership: membership('member') }), true);
  denied(() => action({ membership: membership('member'), action: 'plans.write' }), 'action_denied');
  for (const role of ['officer', 'owner']) {
    assert.equal(action({ membership: membership(role), action: 'plans.write' }), true);
  }
});
test('no role gains arbitrary personal-Core writes or arbitrary guild operations', () => {
  for (const role of ['owner', 'officer', 'member']) {
    for (const operation of ['characters.write', 'notes.read', '*', '__proto__', 'toString']) {
      denied(() => action({ membership: membership(role), action: operation }), 'action_denied');
    }
  }
});
test('revoked invitation cannot be accepted or approved', () => {
  const revoked = revokeInvitation({ principal: leader, membership: membership(), invitation: accepted(), now });
  denied(() => acceptInvitation({ principal: newcomer, invitation: revoked, now }), 'invitation_not_pending');
  denied(() => approve({ invitation: revoked }), 'acceptance_required');
  assert.deepEqual(revokeInvitation({ principal: leader, membership: membership(), invitation: revoked, now }), revoked);
});
test('expired and future invitations fail, including exact expiry', () => {
  for (const at of [now - 1, now + 1000]) {
    denied(() => acceptInvitation({ principal: newcomer, invitation: invite(), now: at }), 'invitation_expired');
    denied(() => approve({ now: at }), 'invitation_expired');
  }
});
test('leaving revokes actions without changing a player identity or creating a character mutation', () => {
  const original = membership('member');
  const left = leaveGuild({ principal: leader, membership: original, now });
  denied(() => action({ membership: left }), 'membership_inactive');
  assert.equal(left.playerCoreId, original.playerCoreId);
  assert.equal(original.state, 'active');
  assert.deepEqual(leaveGuild({ principal: leader, membership: left, now: now + 1 }), left);
  denied(() => leaveGuild({ principal: newcomer, membership: original, now }), 'wrong_player');
});
test('invalid or not-yet-approved membership and unsupported versions fail closed', () => {
  denied(() => action({ membership: { ...membership(), role: 'administrator' } }));
  denied(() => action({ membership: { ...membership(), version: 2 } }));
  denied(() => action({ membership: { ...membership(), approvedAt: now + 1 } }), 'membership_inactive');
});
test('a successful guild approval grants no access to private character state by itself', () => {
  const joined = approve();
  const character = { coreId: newcomer.coreId, game: 'classic-test', realm: 'Example Realm', guid: 'Player-Example-New' };
  const record = { character, revision: 'rev-1', observedAt: now, sections: {
    identity: { name: 'Example New Hero' }, notes: 'SYNTHETIC-PRIVATE',
  } };
  denied(() => projectCharacter({ principal: { kind: 'guild', coreId: guildCoreId },
    record, grant: joined.membership, now }));
  const grant = createGrant({ principal: { kind: 'owner', coreId: newcomer.coreId },
    ownerCoreId: newcomer.coreId, now, input: { id: 'grant-example', guildCoreId,
      character, sections: ['identity'], expiresAt: now + 1000 } });
  const projection = projectCharacter({ principal: { kind: 'guild', coreId: guildCoreId }, record, grant, now });
  assert.equal(JSON.stringify(projection).includes('SYNTHETIC-PRIVATE'), false);
  assert.equal(projection.sections.identity.name, 'Example New Hero');
});
