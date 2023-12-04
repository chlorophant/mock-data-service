import { Elysia, t } from 'elysia'
import { eq, sql } from 'drizzle-orm'
import { faker } from '@faker-js/faker'
import { db } from '../../db/db'
import {
  addresses,
  assignments,
  authorizations,
  communities,
  contacts,
  contactTypes,
  divisions,
  groups,
  invoices,
  locations,
  operatingCompanies,
  paymentTypes,
  persons,
  propertyTypes,
  regions,
  roles,
  users,
  vendors
} from '../../db/schema'
import { seed_config, unseed_config } from './seed.config'

type IDs = {
  addresses: string[]
  assignments: string[]
  authorizations: string[]
  communities: string[]
  contacts: string[]
  divisions: string[]
  groups: string[]
  invoices: string[]
  locations: string[]
  operatingCompanies: string[]
  persons: string[]
  regions: string[]
  users: string[]
  vendors: string[]
}

const randomNumber = (count: number): number => {
  return Math.floor(Math.random() * (count + 1))
}

const abbreviateString = (input: string): string => {
  return (
    input
      .trim()
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('.') + '.'
  )
}

const capitalCaseString = (sentence: string) => {
  const words = sentence.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
  }
  return words.join(' ')
}

export const seed = new Elysia().group('/seed', (app) =>
  app
    .post(
      '/:numberOfRecords',
      async ({ set, params }) => {
        const numberOfRecords = Number(params.numberOfRecords)
        if (numberOfRecords < 5 || numberOfRecords > 5000) {
          set.status = 400
          return { message: 'Invalid input; numberOfRecords must be at least 5 and at most 5000' }
        }
        await seed_records(numberOfRecords)
        set.status = 201
        return {
          message: `Successfully added ${numberOfRecords} of each record type to the database`
        }
      },
      seed_config
    )
    .delete(
      '',
      async () => {
        await unseed_records()
      },
      unseed_config
    )
)

const seed_records = async (count: number) => {
  const extraCount = Math.round(count * 2)
  const allPaymentTypeIds = await db.select({ id: paymentTypes.paymentTypeId }).from(paymentTypes).all()
  const allPropertyTypeIds = await db.select({ id: propertyTypes.propertyTypeId }).from(propertyTypes).all()
  const allRoleIds = await db.select({ id: roles.roleId }).from(roles).all()
  const allContactTypeIds = await db.select({ id: contactTypes.contactTypeId }).from(contactTypes).all()

  const vendorCountResult = await db.select({ count: sql<number>`count(*)` }).from(vendors)
  const vendorCount = vendorCountResult[0].count

  // pre-generate ids for all records for easier relationship building
  const ids: IDs = {
    addresses: [],
    assignments: [],
    authorizations: [],
    communities: [],
    contacts: [],
    divisions: [],
    groups: [],
    invoices: [],
    locations: [],
    operatingCompanies: [],
    persons: [],
    regions: [],
    users: [],
    vendors: []
  }
  for (let i = 0; i < count; i++) {
    ids.assignments.push(crypto.randomUUID())
    ids.authorizations.push(crypto.randomUUID())
    ids.communities.push(crypto.randomUUID())
    ids.contacts.push(crypto.randomUUID())
    ids.divisions.push(crypto.randomUUID())
    ids.groups.push(crypto.randomUUID())
    ids.invoices.push(crypto.randomUUID())
    ids.operatingCompanies.push(crypto.randomUUID())
    ids.persons.push(crypto.randomUUID())
    ids.regions.push(crypto.randomUUID())
    ids.users.push(crypto.randomUUID())
    ids.vendors.push(crypto.randomUUID())
  }

  // Create extra records of certain types
  for (let i = 0; i < extraCount; i++) {
    ids.addresses.push(crypto.randomUUID())
    ids.locations.push(crypto.randomUUID())
  }

  const fake_addresses = []
  for (let i = 0; i < extraCount; i++) {
    fake_addresses.push({
      addressId: ids.addresses[i],
      address1: faker.location.streetAddress(false),
      address2: faker.location.secondaryAddress(),
      city: faker.location.city(),
      stateCode: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      countryCode: faker.location.countryCode(),
      createdBy: 'SEEDER'
    })
  }

  const fake_assignments = []
  for (let i = 0; i < count; i++) {
    fake_assignments.push({
      assignmentId: ids.assignments[i],
      authorizationId: ids.authorizations[i],
      communityId: ids.communities[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_authorizations = []
  for (let i = 0; i < count; i++) {
    fake_authorizations.push({
      authorizationId: ids.authorizations[i],
      contactId: ids.contacts[i],
      roleId: allRoleIds[randomNumber(allRoleIds.length - 1)].id,
      operatingCompanyId: ids.operatingCompanies[i],
      createdBy: 'SEEDER',
      deactivatedDate: null,
      deactivatedBy: null,
      deletedDate: null,
      deletedBy: null
    })
  }

  const fake_communities = []
  for (let i = 0; i < count; i++) {
    const name = capitalCaseString(faker.lorem.words(2))
    const fullName = `${name} ${faker.location.direction()}`
    fake_communities.push({
      communityId: ids.communities[i],
      communityName: fullName,
      shortName: name,
      abbreviation: abbreviateString(fullName),
      addressId: ids.addresses[i],
      divisionId: ids.divisions[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_contacts = []
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    fake_contacts.push({
      contactId: ids.contacts[i],
      personId: ids.persons[i],
      groupId: ids.groups[i],
      contactTypeId: allContactTypeIds[randomNumber(allContactTypeIds.length - 1)].id,
      emailAddress: faker.internet.email({ firstName, lastName }),
      firstName: firstName,
      lastName: lastName,
      title: faker.person.suffix(),
      externalContactIdentifier: capitalCaseString(faker.lorem.words(3)),
      isBoardMember: randomNumber(1) === 0,
      createdBy: 'SEEDER'
    })
  }

  const fake_divisions = []
  for (let i = 0; i < count; i++) {
    const name = faker.company.name()
    const state = faker.location.state()
    const fullName = `${name} Residential ${state}`
    fake_divisions.push({
      divisionId: ids.divisions[i],
      divisionName: fullName,
      shortName: `${name} ${state}`,
      abbreviation: abbreviateString(fullName),
      addressId: ids.addresses[i],
      operatingCompanyId: ids.operatingCompanies[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_groups = []
  for (let i = 0; i < count; i++) {
    const name = faker.company.name()
    fake_groups.push({
      groupId: ids.groups[i],
      groupName: `${name} Residential`,
      shortName: name,
      abbreviation: abbreviateString(name),
      addressId: ids.addresses[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_invoices = []
  for (let i = 0; i < count; i++) {
    fake_invoices.push({
      invoiceId: ids.invoices[i],
      paymentTypeId: allPaymentTypeIds[randomNumber(allPaymentTypeIds.length - 1)].id,
      communityId: ids.communities[i],
      vendorId: ids.vendors[i],
      invoiceName: capitalCaseString(faker.lorem.words(3)),
      invoiceNumber: faker.finance.accountNumber(),
      invoiceAmount: faker.finance.amount(),
      receivedDate: faker.date.past().toISOString(),
      dueDate: faker.date.future().toISOString(),
      createdBy: 'SEEDER'
    })
  }

  const fake_operating_companies = []
  for (let i = 0; i < count; i++) {
    const name = faker.company.name()
    const fullName = `${name} Residential`
    fake_operating_companies.push({
      operatingCompanyId: ids.operatingCompanies[i],
      operatingCompanyName: fullName,
      shortName: name,
      abbreviation: abbreviateString(fullName),
      addressId: ids.addresses[i],
      regionId: ids.regions[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_persons = []
  for (let i = 0; i < count; i++) {
    fake_persons.push({
      personId: ids.persons[i],
      emailAddress: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      title: faker.person.suffix(),
      createdBy: 'SEEDER'
    })
  }

  const fake_regions = []
  for (let i = 0; i < count; i++) {
    const county = faker.location.county()
    const state = faker.location.state()
    const fullName = `${county}, ${state}`
    fake_regions.push({
      regionId: ids.regions[i],
      regionName: fullName,
      shortName: county,
      abbreviation: abbreviateString(fullName),
      addressId: ids.addresses[i],
      groupId: ids.groups[i],
      createdBy: 'SEEDER'
    })
  }

  const fake_users = []
  for (let i = 0; i < count; i++) {
    fake_users.push({
      userId: ids.users[i],
      personId: ids.persons[i],
      authenticationIdentifier: capitalCaseString(faker.lorem.words(3)),
      internalAdministrator: randomNumber(10) === 0,
      acceptedTermsDate: faker.date.past().toISOString(),
      acceptedTermsVersion: `${randomNumber(8) + 1}.0`,
      createdBy: 'SEEDER'
    })
  }

  const fake_vendors = []
  for (let i = 0; i < count; i++) {
    const recordNumber = String(vendorCount + i + 1)
    const tinPartOne = String(faker.number.int({ min: 0, max: 999 })).padStart(3, '0')
    const tinPartTwo = String(faker.number.int({ min: 0, max: 99 })).padStart(2, '0')
    const tinPartThree = String(faker.number.int({ min: 0, max: 9999 })).padStart(4, '0')
    const tin = `${tinPartOne}-${tinPartTwo}-${tinPartThree}`
    fake_vendors.push({
      vendorId: ids.vendors[i],
      vendorNumber: `VND${recordNumber.padStart(7, '0')}`,
      addressId: ids.addresses[i],
      officePhone: faker.phone.number(),
      mobilePhone: faker.phone.number(),
      fax: faker.phone.number(),
      vendorName: faker.company.name(),
      vendorType: vendors.vendorType.enumValues[randomNumber(9)],
      federalID: tin,
      alternateName: faker.company.name(),
      alternateNameType: vendors.alternateNameType.enumValues[randomNumber(2)],
      createdBy: 'SEEDER'
    })
  }

  const fake_locations = []
  for (let i = 0; i < extraCount; i++) {
    fake_locations.push({
      locationId: ids.locations[i],
      locationName: `${fake_vendors[Math.floor(i / 2)].vendorName} - ${faker.location.direction()}`,
      addressId: ids.addresses[i],
      vendorId: ids.vendors[Math.floor(i / 2)], // 2 locations per vendor
      officePhone: faker.phone.number(),
      mobilePhone: faker.phone.number(),
      fax: faker.phone.number(),
      createdBy: 'SEEDER'
    })
  }

  try {
    await db.insert(addresses).values(fake_addresses)
    await db.insert(assignments).values(fake_assignments)
    await db.insert(authorizations).values(fake_authorizations)
    await db.insert(communities).values(fake_communities)
    await db.insert(contacts).values(fake_contacts)
    await db.insert(divisions).values(fake_divisions)
    await db.insert(groups).values(fake_groups)
    await db.insert(invoices).values(fake_invoices)
    await db.insert(locations).values(fake_locations)
    await db.insert(operatingCompanies).values(fake_operating_companies)
    await db.insert(persons).values(fake_persons)
    await db.insert(regions).values(fake_regions)
    await db.insert(users).values(fake_users)
    await db.insert(vendors).values(fake_vendors)
  } catch (e) {
    console.log('Error seeding records:', e)
  }
}

const unseed_records = async () => {
  await Promise.allSettled([
    db.delete(addresses).where(eq(addresses.createdBy, 'SEEDER')),
    db.delete(assignments).where(eq(assignments.createdBy, 'SEEDER')),
    db.delete(authorizations).where(eq(authorizations.createdBy, 'SEEDER')),
    db.delete(communities).where(eq(communities.createdBy, 'SEEDER')),
    db.delete(contacts).where(eq(contacts.createdBy, 'SEEDER')),
    db.delete(divisions).where(eq(divisions.createdBy, 'SEEDER')),
    db.delete(groups).where(eq(groups.createdBy, 'SEEDER')),
    db.delete(invoices).where(eq(invoices.createdBy, 'SEEDER')),
    db.delete(locations).where(eq(invoices.createdBy, 'SEEDER')),
    db.delete(operatingCompanies).where(eq(operatingCompanies.createdBy, 'SEEDER')),
    db.delete(persons).where(eq(persons.createdBy, 'SEEDER')),
    db.delete(regions).where(eq(regions.createdBy, 'SEEDER')),
    db.delete(users).where(eq(users.createdBy, 'SEEDER')),
    db.delete(vendors).where(eq(vendors.createdBy, 'SEEDER'))
  ])
}
