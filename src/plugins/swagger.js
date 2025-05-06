import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async function (fastify, options) {
	await fastify.register(swagger, {
		swagger: {
			info: {
				title: 'Raquet API',
				description: 'API para o sistema de gerenciamento de usuários do app RaquetMatch',
				version: '1.0.0'
			},
			externalDocs: {
				url: 'addUrlGitHub',
				description: 'GitHub'
			},
			host: 'localhost:3000',
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
			tags: [
				{
					name: 'Users',
					description: 'Endpoints de usuários'
				}
			]
		}
	})

	await fastify.register(swaggerUi, {
		routePrefix: '/docs',
		uiConfig: {
			docExpansion: 'full',
			deepLinking: false
		}
	})
})
