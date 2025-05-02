import { createUser, getUsers } from './users.controller.js'
import userSchema from './users.schema.js'

export default async function(fastify, opts) {
	fastify.post('/', {
		schema: userSchema.createUser,
		handler: createUser
	})

	fastify.get('/', {
		schema: userSchema.getUsers,
		handler: getUsers
	})
}
