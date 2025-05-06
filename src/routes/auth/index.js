import authSchema from './auth.schema.js'
import { login } from './auth.controller.js'

export default async function (fastify, opts) {
	fastify.post('/login', {
		schema: authSchema.login,
		handler: login
	})
}
