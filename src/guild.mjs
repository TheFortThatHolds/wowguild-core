// Policy only. A trusted adapter authenticates peers and atomically persists state.
import { CONTRACT_VERSION, assertId, assertTime, assertObject, assertMembership,
  assertInvitation, requireContract } from '@wow-core/contracts';

const actions = Object.freeze({
  'plans.read': ['owner', 'officer', 'member'],
  'plans.write': ['owner', 'officer'],
  'members.invite': ['owner', 'officer'],
  'members.approve': ['owner', 'officer'],
  'members.revokeInvitation': ['owner', 'officer'],
});
function player(principal, coreId) {
  requireContract(principal?.kind === 'player' && principal.coreId === coreId, 'wrong_player');
}
export function authorizeGuildAction({ principal, membership, guildCoreId, action, now }) {
  assertId(guildCoreId); assertTime(now); assertMembership(membership);
  player(principal, membership.playerCoreId);
  requireContract(membership.guildCoreId === guildCoreId, 'wrong_guild');
  requireContract(membership.state === 'active' && now >= membership.approvedAt,
    'membership_inactive');
  requireContract(Object.hasOwn(actions, action) && actions[action].includes(membership.role),
    'action_denied');
  return true;
}
export function createInvitation({ principal, membership, guildCoreId, input, now }) {
  authorizeGuildAction({ principal, membership, guildCoreId, action: 'members.invite', now });
  assertObject(input, ['id', 'playerCoreId', 'expiresAt']);
  const invitation = { version: CONTRACT_VERSION, id: input.id, guildCoreId,
    playerCoreId: input.playerCoreId, state: 'pending', issuedAt: now,
    expiresAt: input.expiresAt, acceptedAt: null };
  assertInvitation(invitation);
  return invitation;
}
function invitationActive(invitation, now) {
  assertInvitation(invitation); assertTime(now);
  requireContract(now >= invitation.issuedAt && now < invitation.expiresAt,
    'invitation_expired');
}
export function acceptInvitation({ principal, invitation, now }) {
  invitationActive(invitation, now); player(principal, invitation.playerCoreId);
  requireContract(invitation.state === 'pending', 'invitation_not_pending');
  return { ...invitation, state: 'accepted', acceptedAt: now };
}
export function approveInvitation({ principal, membership, invitation, existingMembership, now }) {
  invitationActive(invitation, now);
  authorizeGuildAction({ principal, membership, guildCoreId: invitation.guildCoreId,
    action: 'members.approve', now });
  requireContract(invitation.state === 'accepted', 'acceptance_required');
  requireContract(now >= invitation.acceptedAt, 'invalid_transition_time');
  // A trusted exact read must establish absence; never overwrite an existing member.
  requireContract(existingMembership === null, 'membership_conflict');
  return {
    invitation: { ...invitation, state: 'approved' },
    membership: { version: CONTRACT_VERSION, id: invitation.id,
      guildCoreId: invitation.guildCoreId, playerCoreId: invitation.playerCoreId,
      role: 'member', state: 'active', approvedAt: now, leftAt: null },
  };
}
export function revokeInvitation({ principal, membership, invitation, now }) {
  assertInvitation(invitation); assertTime(now);
  authorizeGuildAction({ principal, membership, guildCoreId: invitation.guildCoreId,
    action: 'members.revokeInvitation', now });
  requireContract(now >= invitation.issuedAt, 'invalid_transition_time');
  requireContract(invitation.state !== 'approved', 'already_approved');
  return { ...invitation, state: 'revoked' };
}
export function leaveGuild({ principal, membership, now }) {
  assertMembership(membership); assertTime(now); player(principal, membership.playerCoreId);
  requireContract(now >= membership.approvedAt, 'invalid_transition_time');
  return { ...membership, state: 'left', leftAt: membership.leftAt ?? now };
}
