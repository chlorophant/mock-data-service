import { t } from 'elysia'
import { limitOffsetParams, byIdParams, MANUAL_MANIPULATION_TAG } from '../../config/swagger'

const TAG = 'Contact'

const get_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...limitOffsetParams } }
const get_validation = { query: t.Object({ limit: t.String(), offset: t.String() }) }
export const get_config = { ...get_swagger, ...get_validation }

const get_by_id_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...byIdParams } }
const get_by_id_validation = { params: t.Object({ id: t.String() }) }
export const get_by_id_config = { ...get_by_id_swagger, ...get_by_id_validation }

const post_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG] } }
const post_validation = {
  body: t.Object({
    personId: t.String(),
    groupId: t.String(),
    contactTypeId: t.String(),
    emailAddress: t.String(),
    firstName: t.String(),
    lastName: t.String(),
    title: t.String(),
    externalContactIdentifier: t.String(),
    isBoardMember: t.Boolean(),
    createdBy: t.String(),
    deactivatedDate: t.Optional(t.String()),
    deactivatedBy: t.Optional(t.String()),
    deletedDate: t.Optional(t.String()),
    deletedBy: t.Optional(t.String())
  })
}
export const post_config = { ...post_swagger, ...post_validation }

const patch_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...byIdParams } }
const patch_validation = {
  params: t.Object({ id: t.String() }),
  body: t.Object({
    personId: t.Optional(t.String()),
    groupId: t.Optional(t.String()),
    contactTypeId: t.Optional(t.String()),
    emailAddress: t.Optional(t.String()),
    firstName: t.Optional(t.String()),
    lastName: t.Optional(t.String()),
    title: t.Optional(t.String()),
    externalContactIdentifier: t.Optional(t.String()),
    isBoardMember: t.Optional(t.Boolean()),
    createdBy: t.Optional(t.String()),
    deactivatedDate: t.Optional(t.String()),
    deactivatedBy: t.Optional(t.String()),
    deletedDate: t.Optional(t.String()),
    deletedBy: t.Optional(t.String())
  })
}
export const patch_config = { ...patch_swagger, ...patch_validation }

const delete_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...byIdParams } }
const delete_validation = { params: t.Object({ id: t.String() }) }
export const delete_config = { ...delete_swagger, ...delete_validation }
