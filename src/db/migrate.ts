import { db } from './db'
import { contactTypes, paymentTypes, propertyTypes, roles } from './schema'
import { migrate as sqlMigrate } from 'drizzle-orm/bun-sqlite/migrator'

export const migrate = async () => {
  console.log('⏳️  Migrating database... ⏳️')
  await sqlMigrate(db, { migrationsFolder: './src/migrations' })
  console.log('🚀  Migrated successfully! 🚀')
}

export const ensureLookupTables = async () => {
  console.log('⏳️  Ensuring lookup tables are present... ⏳️')

  // TODO: Figure out the kinds of contact types that exist
  await db
    .insert(contactTypes)
    .values([
      {
        contactTypeId: '17cf1815-db01-4503-9aa3-0f19d0c1a8af',
        contactTypeName: 'user',
        contactTypeDescription: 'internal user',
        ranking: 1,
        createdBy: 'SYSTEM'
      },
      {
        contactTypeId: '29f6cff9-28be-4e5f-95e0-5c1302d86e31',
        contactTypeName: 'group',
        contactTypeDescription: 'external group',
        ranking: 2,
        createdBy: 'SYSTEM'
      }
    ])
    .onConflictDoNothing({ target: contactTypes.contactTypeId })

  // TODO: Figure out the kinds of roles that exist
  await db
    .insert(roles)
    .values([
      {
        roleId: '2848bd85-9b79-4fe9-874f-5f411a9a100a',
        roleName: 'superuser',
        roleDescription: 'superuser',
        ranking: 1,
        createdBy: 'SYSTEM'
      },
      {
        roleId: '0118bd50-abf9-4af4-b712-c0ef8b1970db',
        roleName: 'administrator',
        roleDescription: 'administrator',
        ranking: 2,
        createdBy: 'SYSTEM'
      },
      {
        roleId: '4ea55731-2bad-447f-bc3e-0be04bc1cd70',
        roleName: 'user',
        roleDescription: 'user',
        ranking: 3,
        createdBy: 'SYSTEM'
      }
    ])
    .onConflictDoNothing({ target: roles.roleId })

  await db
    .insert(propertyTypes)
    .values([
      {
        propertyTypeId: 'f6c0ac5a-fd5d-4128-be1f-2aede50c5cae',
        propertyTypeName: 'HOA',
        propertyTypeDescription: 'Homeowners Association',
        ranking: 1,
        createdBy: 'SYSTEM'
      },
      {
        propertyTypeId: '7107d046-c282-465f-8fd6-ee184d23f801',
        propertyTypeName: 'Condo',
        propertyTypeDescription: 'Condominium Association',
        ranking: 2,
        createdBy: 'SYSTEM'
      },
      {
        propertyTypeId: '899b4e9f-6a2f-46f0-b545-f65a118f170b',
        propertyTypeName: 'Co-Op',
        propertyTypeDescription: 'Cooperative Association',
        ranking: 3,
        createdBy: 'SYSTEM'
      }
    ])
    .onConflictDoNothing({ target: propertyTypes.propertyTypeId })

  await db
    .insert(paymentTypes)
    .values([
      {
        paymentTypeId: '2c61c595-6621-4059-b566-3c2809ec8149',
        paymentTypeName: 'ACD',
        paymentTypeDescription: 'Payment by ACH',
        ranking: 1,
        createdBy: 'SYSTEM'
      },
      {
        paymentTypeId: 'e3060507-51f0-400d-bdbd-042e15df435f',
        paymentTypeName: 'Check',
        paymentTypeDescription: 'Payment by Check',
        ranking: 2,
        createdBy: 'SYSTEM'
      }
    ])
    .onConflictDoNothing({ target: paymentTypes.paymentTypeId })

  console.log('🚀  Look tables populated! 🚀')
}
