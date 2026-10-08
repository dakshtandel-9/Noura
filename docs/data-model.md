# Data model / proposed field-level blueprint
This is a schema design, not an executed migration. Review it with the field dictionary and privacy instructions before implementation.

## Tables
| Entity | Required shape | Important rule |
|---|---|---|
| admin_authorizations | auth_user_id PK/FK, enabled, provisioned_at, provisioned_by | Only server/owner provisioning can change authorization; do not trust user-editable metadata |
| invitation_requests | id UUID PK, name, email, optional phone/source, interests, status, created_at, updated_at, contacted, contacted_at, notice_version, acknowledged_at, idempotency_key, reviewer_id, private_note, version | Private; no anonymous select; idempotency key unique; bounded text |
| appointment_requests | id UUID PK, name, email, optional phone, session_type, preferred_date, timezone, message, status, contacted, contacted_at, review fields and acknowledgement metadata | Date preference not a booking; session_type constrained to approved values |
| members | id UUID PK, member_code UNIQUE, name, email, optional phone, state, source_invitation_id UNIQUE nullable, created_at, updated_at, version | Stable code; never use sequential display code as an access secret |
| audit_events | id, actor_id, action, entity_type, entity_id, timestamp, minimal metadata | Do not copy full messages, credentials or personal profiles into logs |
| media_assets (only if needed) | id, object_key, visibility, mime_type, byte_size, alt_text, rights_reference, approved_by, created_at | Public marketing and private objects are separately classified |
| site_content (if agreed) | fixed key, validated value, version, updated_by, updated_at | No arbitrary HTML page-builder or template editing |
| card_exports (optional metadata) | id, member_id, template_version, generated_by, generated_at, object_key nullable | No persistent file is required if generated and streamed on demand |

## Index and integrity plan
Index request type/state and created_at for review queues; normalize comparison email without changing the displayed address; index searchable member_code. Unique constraints enforce idempotency keys and source_invitation_id. Add a unique normalized member-email rule only after the client agrees one-member-per-email is correct; do not silently reject shared family addresses. Foreign keys link reviewers to auth identities where appropriate. The schema must reject invalid status strings and oversize fields.

## ID format
Internal identity: random UUID. Proposed readable code: `NRA-2026-000123`, assigned atomically by the server/database. The year component and branding prefix require approval. No code is reused after deletion/revocation; editing a member name leaves it unchanged. Public demonstration code: `NRA-DEMO-001` only. QR is optional and disabled by default.

## Concurrent and repeated approval
Two reviewers can open the same request. Use an expected `version` or transactional lock; the second conflicting edit receives a refresh message. Repeat approval looks up the linked member and returns it rather than generating another. Approve/decline transitions must be validated server-side. Creation and request status update happen in one transaction so partial completion cannot leave a broken relationship.

## Privacy and retention
Submission time is recorded server-side as a UTC timestamp and shown to staff in their local time zone, including seconds. `contacted` is a separate admin-set follow-up flag; `contacted_at` records when it was marked. Older requests without these fields display as not yet marked contacted until staff review them.

Collect no health history, identity documents, financial data or date of birth by default. Retention duration, deletion/archival procedure and any lawful recordkeeping exception are client decisions. Do not invent a retention period. A simple restricted deletion workflow can be administrative until an approved self-service flow is scoped. Backup deletion/expiry behaviour must be documented rather than claiming instant deletion from every backup.

## Permissions matrix
| Operation | Anonymous | Authenticated non-admin | Enabled admin |
|---|---|---|---|
| Read published marketing content | Yes | Yes | Yes |
| Submit approved request | Server-validated narrow endpoint | Same public endpoint | Yes |
| Read requests or members | No | No | Only authorized staff functions |
| Approve/reject/update | No | No | Yes, validated and audited |
| Generate/private-download card | No | No | Yes, checked per operation |
| Grant admin authorization | No | No | Owner/provider provisioning only |

An elevated service key bypasses normal RLS; its server-only use must be confined to a narrowly validated operation and not exposed as a generic database proxy. Test database permissions directly with non-admin sessions, not only through UI tests. [T6,T7]

## Sample data policy
Use obvious fictional entries and reserved example domains in development. Do not prepopulate live records from client screenshots. Never export a real applicant database with the downloadable design files. The presentation contains no live customer records.
