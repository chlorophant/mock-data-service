import { Elysia } from 'elysia'
import { db } from '../../db/db'
import { eq } from 'drizzle-orm'
import { addresses, locations, vendors } from '../../db/schema'
import { get_config } from './vendor.config'

export const vendor = new Elysia().group('/vendor', (app) =>
  app.get(
    '',
    async ({ query }) => {
      const limit = Number(query.limit)
      const offset = Number(query.offset)
      const found = await db.query.vendors.findMany({
        with: {
          address: true,
          locations: {
            with: {
              address: true
            }
          }
        },
        limit,
        offset
      })
      return found || []
    },
    get_config
  )
)
