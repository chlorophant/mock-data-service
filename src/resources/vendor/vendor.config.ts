import { t } from 'elysia'
import { limitOffsetParams, byIdParams, MANUAL_MANIPULATION_TAG } from '../../config/swagger'

const TAG = 'Vendor'

const get_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...limitOffsetParams } }
const get_validation = { query: t.Object({ limit: t.String(), offset: t.String() }) }
export const get_config = { ...get_swagger, ...get_validation }

const get_by_id_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG], ...byIdParams } }
const get_by_id_validation = { params: t.Object({ id: t.String() }) }
export const get_by_id_config = { ...get_by_id_swagger, ...get_by_id_validation }

const post_swagger = { detail: { tags: [MANUAL_MANIPULATION_TAG] } }
const post_validation = {
  body: t.Object({
    vendorName: t.String(),
    vendorType: t.Union([
      t.Literal('Attorney'),
      t.Literal('Bank'),
      t.Literal('Company'),
      t.Literal('CPA'),
      t.Literal('CreditCardAccount'),
      t.Literal('Donations'),
      t.Literal('GoverningEntity'),
      t.Literal('Insurance'),
      t.Literal('ManagementGroup'),
      t.Literal('Utility')
    ]),
    alternateName: t.String(),
    alternateNameType: t.Union([t.Literal('AKA'), t.Literal('FKA'), t.Literal('DBA')]),
    mobilePhone: t.String(),
    officePhone: t.String(),
    fax: t.String(),
    federalID: t.String(),
    addressId: t.String(),
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
    vendorName: t.Optional(t.String()),
    vendorType: t.Optional(
      t.Union([
        t.Literal('Attorney'),
        t.Literal('Bank'),
        t.Literal('Company'),
        t.Literal('CPA'),
        t.Literal('CreditCardAccount'),
        t.Literal('Donations'),
        t.Literal('GoverningEntity'),
        t.Literal('Insurance'),
        t.Literal('ManagementGroup'),
        t.Literal('Utility')
      ])
    ),
    alternateName: t.Optional(t.String()),
    alternateNameType: t.Optional(t.Union([t.Literal('AKA'), t.Literal('FKA'), t.Literal('DBA')])),
    mobilePhone: t.Optional(t.String()),
    officePhone: t.Optional(t.String()),
    fax: t.Optional(t.String()),
    federalID: t.Optional(t.String()),
    addressId: t.Optional(t.String()),
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
