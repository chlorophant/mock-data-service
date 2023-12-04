import { Elysia } from 'elysia'
import { seed } from './seed/seed'
import { address } from './address/address'
import { assignment } from './assignment/assignment'
import { authorization } from './authorization/authorization'
import { community } from './community/community'
import { contact } from './contact/contact'
import { contactType } from './contactType/contactType'
import { division } from './division/division'
import { group } from './group/group'
import { invoice } from './invoice/invoice'
import { location } from './location/location'
import { operatingCompany } from './operatingCompany/operatingCompany'
import { paymentType } from './paymentType/paymentType'
import { region } from './region/region'
import { role } from './role/role'
import { user } from './user/user'
import { vendor } from './vendor/vendor'

export const resources = new Elysia().group('/resources', (app) =>
  app
    .use(seed)
    .use(address)
    .use(assignment)
    .use(authorization)
    .use(community)
    .use(contact)
    .use(contactType)
    .use(division)
    .use(group)
    .use(invoice)
    .use(location)
    .use(operatingCompany)
    .use(paymentType)
    .use(region)
    .use(role)
    .use(user)
    .use(vendor)
)
