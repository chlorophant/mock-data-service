import { t } from 'elysia'
import { limitOffsetParams, byIdParams, MANUAL_MANIPULATION_TAG } from '../../config/swagger'

const TAG = 'Authorization'

const get_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...limitOffsetParams } }
const get_validation = { query: t.Object({ limit: t.String(), offset: t.String() }) }
export const get_config = { ...get_swagger, ...get_validation }

const get_by_id_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...byIdParams } }
const get_by_id_validation = { params: t.Object({ id: t.String() }) }
export const get_by_id_config = { ...get_by_id_swagger, ...get_by_id_validation }

const post_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG] } }
const post_validation = {
  body: t.Object({
    contactId: t.String(),
    roleId: t.String(),
    operatingCompanyId: t.String(),
    zipCode: t.String(),
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
    contactId: t.Optional(t.String()),
    roleId: t.Optional(t.String()),
    operatingCompanyId: t.Optional(t.String()),
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
