import { Elysia } from 'elysia'
import { vendor } from './vendor/vendor'

export const bff = new Elysia().group('/bff', (app) => app.use(vendor))
