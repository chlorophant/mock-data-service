import { t } from 'elysia'
import { limitOffsetParams, byIdParams, BFF_TAG } from '../../config/swagger'

const TAG = 'Vendor'

const get_swagger = { detail: { tags: [BFF_TAG], ...limitOffsetParams } }
const get_validation = { query: t.Object({ limit: t.String(), offset: t.String() }) }
export const get_config = { ...get_swagger, ...get_validation }

const get_by_id_swagger = { detail: { tags: [BFF_TAG], ...byIdParams } }
const get_by_id_validation = { params: t.Object({ vendorId: t.String() }) }
export const get_by_id_config = { ...get_by_id_swagger, ...get_by_id_validation }
