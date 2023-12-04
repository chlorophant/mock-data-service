import { t } from 'elysia'
import { seedByNumberParams } from '../../config/swagger'

const seed_swagger = { detail: { tags: ['Seed'], ...seedByNumberParams } }
const seed_validation = { params: t.Object({ numberOfRecords: t.String() }) }
export const seed_config = { ...seed_swagger, ...seed_validation }

const unseed_swagger = { detail: { tags: ['Seed'] } }
export const unseed_config = { ...unseed_swagger }
