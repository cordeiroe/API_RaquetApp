import fp from 'fastify-plugin'
import jwt from 'fastify-jwt'

export default fp(async function (fastify, options) {
	fastify.register(jwt, {
		secret: process.env.JWT_SECRET,
		sign: {
			expiresIn: '1h'
		}
	})

	fastify.decorate('authenticate', async function (request, reply) {
		try {
			await request.jwtVerify()
		} catch (err) {
			reply.code(401).send({
				statusCode: 401,
				error: 'Não autorizado',
				message: 'Você precisa estar autenticado para acessar este recurso'
			})
		}
	})
})
