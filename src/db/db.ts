import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import * as schema from './schema'
const localSqlite = new Database('mock.db')
// export const db = drizzle(localSqlite, { schema, logger: true })
export const db = drizzle(localSqlite, { schema })
