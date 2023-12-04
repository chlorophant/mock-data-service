import { Elysia } from 'elysia'
import { db } from '../../db/db'
import { eq } from 'drizzle-orm'
import { addresses as table } from '../../db/schema'
import { get_config, get_by_id_config, post_config, patch_config, delete_config } from './address.config'

export const address = new Elysia().group('/address', (app) =>
  app
    .get(
      '',
      async ({ query }) => {
        const limit = Number(query.limit)
        const offset = Number(query.offset)
        const found = await db.select().from(table).limit(limit).offset(offset).orderBy(table.zipCode).all()
        return found || []
      },
      get_config
    )
    .get(
      '/:id',
      async ({ params, set }) => {
        const found = await db
          .select()
          .from(table)
          .where(eq(table.addressId, params.id))
          .orderBy(table.createdDate)
          .all()
        if (!found.length) {
          set.status = 404
          return { message: `No record found with id: ${params.id}` }
        }
        return found[0]
      },
      get_by_id_config
    )
    .post(
      '',
      async ({ body, set }) => {
        const record = { ...body, addressId: crypto.randomUUID() }
        const createdRecord = await db.insert(table).values(record).returning()
        set.status = 201
        return createdRecord
      },
      post_config
    )
    .patch(
      '/:id',
      async ({ params, body, set }) => {
        const found = await db
          .select()
          .from(table)
          .where(eq(table.addressId, params.id))
          .orderBy(table.createdDate)
          .all()
        if (!found.length) {
          set.status = 404
          return { message: `No record found with id: ${params.id}` }
        }
        const patch = { ...found[0], ...body }
        await db.update(table).set(patch).where(eq(table.addressId, params.id))
        set.status = 200
        return { message: `Successfully patched record with id: ${params.id}` }
      },
      patch_config
    )
    .delete(
      '/:id',
      async ({ params, set }) => {
        const found = await db
          .select()
          .from(table)
          .where(eq(table.addressId, params.id))
          .orderBy(table.createdDate)
          .all()
        if (!found.length) {
          set.status = 404
          return { message: `No record found with id: ${params.id}` }
        }
        await db.delete(table).where(eq(table.addressId, params.id))
        set.status = 202
        return { message: `Successfully deleted record with id: ${params.id}` }
      },
      delete_config
    )
)
