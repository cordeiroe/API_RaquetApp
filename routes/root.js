export default async function (fastify, opts) {
	fastify.get('/', async (request, reply) => ({ root: true }))
}
