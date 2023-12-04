import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'

export const addresses = sqliteTable('Addresses', {
  addressId: text('AddressId').primaryKey().notNull(),
  address1: text('Address1').notNull(),
  address2: text('Address2'),
  city: text('City').notNull(),
  stateCode: text('StateCode'),
  zipCode: text('ZipCode'),
  countryCode: text('CountryCode'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const addressRelations = relations(addresses, ({ many }) => ({
  locations: many(locations)
}))

export const assignments = sqliteTable('Assignments', {
  assignmentId: text('AssignmentId').primaryKey().notNull(),
  authorizationId: text('AuthorizationId')
    .notNull()
    .references(() => authorizations.authorizationId),
  communityId: text('CommunityId')
    .notNull()
    .references(() => communities.communityId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const authorizations = sqliteTable('Authorizations', {
  authorizationId: text('AuthorizationId').primaryKey().notNull(),
  contactId: text('ContactId')
    .notNull()
    .references(() => contacts.contactId),
  roleId: text('RoleId')
    .notNull()
    .references(() => roles.roleId),
  operatingCompanyId: text('OperatingCompanyId')
    .notNull()
    .references(() => operatingCompanies.operatingCompanyId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const communities = sqliteTable('Communities', {
  communityId: text('CommunityId').primaryKey().notNull(),
  communityName: text('CommunityName'),
  shortName: text('ShortName'),
  abbreviation: text('Abbreviation'),
  addressId: text('AddressId').references(() => addresses.addressId),
  divisionId: text('DivisionId').references(() => divisions.divisionId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const contacts = sqliteTable('Contacts', {
  contactId: text('ContactId').primaryKey().notNull(),
  personId: text('PersonId').references(() => persons.personId),
  groupId: text('GroupId').references(() => groups.groupId),
  contactTypeId: text('ContactTypeId').references(() => contactTypes.contactTypeId),
  emailAddress: text('EmailAddress').notNull(),
  firstName: text('FirstName').notNull(),
  lastName: text('LastName').notNull(),
  title: text('Title'),
  externalContactIdentifier: text('ExternalContactIdentifier'),
  isBoardMember: integer('IsBoardMember', { mode: 'boolean' }),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const contactTypes = sqliteTable('ContactTypes', {
  contactTypeId: text('ContactTypeId').primaryKey().notNull(),
  contactTypeName: text('ContactTypeName'),
  contactTypeDescription: text('ContactTypeDescription'),
  ranking: integer('Ranking'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const divisions = sqliteTable('Divisions', {
  divisionId: text('DivisionId').primaryKey().notNull(),
  divisionName: text('DivisionName'),
  shortName: text('ShortName'),
  abbreviation: text('Abbreviation'),
  addressId: text('AddressId').references(() => addresses.addressId),
  operatingCompanyId: text('OperatingCompanyId').references(() => operatingCompanies.operatingCompanyId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const groups = sqliteTable('Groups', {
  groupId: text('GroupId').primaryKey().notNull(),
  groupName: text('GroupName'),
  shortName: text('ShortName'),
  abbreviation: text('Abbreviation'),
  addressId: text('AddressId').references(() => addresses.addressId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const invoices = sqliteTable('Invoices', {
  invoiceId: text('InvoiceId').primaryKey().notNull(),
  paymentTypeId: text('PaymentTypeId')
    .notNull()
    .references(() => paymentTypes.paymentTypeId),
  communityId: text('CommunityId')
    .notNull()
    .references(() => communities.communityId),
  vendorId: text('VendorId')
    .notNull()
    .references(() => vendors.vendorId),
  invoiceName: text('InvoiceName').notNull(),
  invoiceNumber: text('InvoiceNumber').notNull(),
  invoiceAmount: text('InvoiceAmount').notNull(),
  receivedDate: text('ReceivedDate').notNull(),
  dueDate: text('DueDate'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const locations = sqliteTable(
  'Locations',
  {
    locationId: text('LocationId').notNull(),
    locationName: text('LocationName').notNull(),
    addressId: text('AddressId')
      .notNull()
      .references(() => addresses.addressId),
    vendorId: text('VendorId')
      .notNull()
      .references(() => vendors.vendorId),
    officePhone: text('OfficePhone'),
    mobilePhone: text('MobilePhone'),
    fax: text('Fax'),
    createdDate: text('CreatedDate')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdBy: text('CreatedBy').notNull(),
    deactivatedDate: text('DeactivatedDate'),
    deactivatedBy: text('DeactivatedBy'),
    deletedDate: text('DeletedDate'),
    deletedBy: text('DeletedBy')
  },
  (t) => ({
    pk: primaryKey(t.addressId, t.vendorId)
  })
)

export const locationRelations = relations(locations, ({ one }) => ({
  vendor: one(vendors, {
    fields: [locations.vendorId],
    references: [vendors.vendorId]
  }),
  address: one(addresses, {
    fields: [locations.addressId],
    references: [addresses.addressId]
  })
}))

export const operatingCompanies = sqliteTable('OperatingCompanies', {
  operatingCompanyId: text('OperatingCompanyId').primaryKey().notNull(),
  operatingCompanyName: text('OperatingCompanyName'),
  shortName: text('ShortName'),
  abbreviation: text('Abbreviation'),
  addressId: text('AddressId').references(() => addresses.addressId),
  regionId: text('RegionId').references(() => regions.regionId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const paymentTypes = sqliteTable('PaymentTypes', {
  paymentTypeId: text('PaymentTypeId').primaryKey().notNull(),
  paymentTypeName: text('PaymentTypeName'),
  paymentTypeDescription: text('PaymentTypeDescription'),
  ranking: integer('Ranking'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const persons = sqliteTable('Persons', {
  personId: text('PersonId').primaryKey().notNull(),
  emailAddress: text('EmailAddress').notNull(),
  firstName: text('FirstName').notNull(),
  lastName: text('LastName').notNull(),
  title: text('Title'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const propertyTypes = sqliteTable('PropertyTypes', {
  propertyTypeId: text('PropertyTypeId').primaryKey().notNull(),
  propertyTypeName: text('PropertyTypeName'),
  propertyTypeDescription: text('PropertyTypeDescription'),
  ranking: integer('Ranking'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const regions = sqliteTable('Regions', {
  regionId: text('RegionId').primaryKey().notNull(),
  regionName: text('RegionName'),
  shortName: text('ShortName'),
  abbreviation: text('Abbreviation'),
  addressId: text('AddressId').references(() => addresses.addressId),
  groupId: text('GroupId').references(() => groups.groupId),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const roles = sqliteTable('Roles', {
  roleId: text('RoleId').primaryKey().notNull(),
  roleName: text('RoleName').notNull(),
  roleDescription: text('RoleDescription').notNull(),
  ranking: integer('Ranking'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const users = sqliteTable('Users', {
  userId: text('UserId').primaryKey().notNull(),
  personId: text('PersonId')
    .notNull()
    .references(() => persons.personId),
  authenticationIdentifier: text('AuthenticationIdentifier').notNull(),
  internalAdministrator: integer('InternalAdministrator', { mode: 'boolean' }).default(false).notNull(),
  acceptedTermsDate: text('AcceptedTermsDate'),
  acceptedTermsVersion: text('AcceptedTermsVersion'),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const vendors = sqliteTable('Vendors', {
  vendorId: text('VendorId').primaryKey().notNull(),
  vendorNumber: text('vendorNumber').notNull(),
  vendorType: text('VendorType', {
    enum: [
      'Attorney',
      'Bank',
      'Company',
      'CPA',
      'CreditCardAccount',
      'Donations',
      'GoverningEntity',
      'Insurance',
      'ManagementGroup',
      'Utility'
    ]
  }).notNull(),
  addressId: text('AddressId').references(() => addresses.addressId),
  vendorName: text('VendorName').notNull(),
  officePhone: text('OfficePhone'),
  mobilePhone: text('MobilePhone'),
  fax: text('Fax'),
  federalID: text('FederalID').notNull(),
  alternateName: text('AlternateName'),
  alternateNameType: text('AlternateNameType', { enum: ['AKA', 'FKA', 'DBA'] }),
  createdDate: text('CreatedDate')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: text('CreatedBy').notNull(),
  deactivatedDate: text('DeactivatedDate'),
  deactivatedBy: text('DeactivatedBy'),
  deletedDate: text('DeletedDate'),
  deletedBy: text('DeletedBy')
})

export const vendorRelations = relations(vendors, ({ many, one }) => ({
  address: one(addresses, {
    fields: [vendors.addressId],
    references: [addresses.addressId]
  }),
  locations: many(locations)
}))
