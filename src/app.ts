import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { swaggerConfig } from './config/swagger'
import { bff } from './bff/bff'
import { resources } from './resources/resources'
import { ensureLookupTables, migrate } from './db/migrate'

console.log(`⏳️  Launching Mock Data Server...  ⏳️`)
await migrate()
await ensureLookupTables()

const app = new Elysia()
  .use(swagger(swaggerConfig))
  .use(bff)
  .use(resources)
  .listen(process.env.PORT || 9001)

console.log(`🏃 Mock Data Server is running at http://${app.server?.hostname}:${app.server?.port}  🏃`)
console.log(`📑  See the swagger docs here: http://${app.server?.hostname}:${app.server?.port}/swagger    📑`)
