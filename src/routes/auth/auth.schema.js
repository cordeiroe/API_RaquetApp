import { errorResponse } from '../../schemas/common.js'

const authSchema = {
	login: {
		tags: ['Auth'],
		body: {
			type: 'object',
			required: ['email', 'password'],
			properties: {
				email: { type: 'string', format: 'email' },
				password: { type: 'string' }
			}
		},
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string', description: 'Mensagem de sucesso' },
					token: { type: 'string', description: 'Token de autenticação' }
				}
			},
			401: {
				...errorResponse,
				description: 'Erro de autenticação',
				example: {
					statusCode: 401,
					message: 'Erro de autenticação',
					error: 'Não autorizado'
				}
			},
			500: {
				...errorResponse,
				description: 'Erro interno do servidor',
				example: {
					statusCode: 500,
					message: 'Erro interno do servidor',
					error: 'InternalServerError'
				}
			}
		}
	}
}

export default authSchema
