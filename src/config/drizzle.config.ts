import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  driver: 'libsql',
  out: './src/migrations',
  dbCredentials: {
    url: 'file:./mock.db'
  }
} satisfies Config
