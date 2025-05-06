export const errorResponse = {
	type: 'object',
	properties: {
		statusCode: { type: 'number', description: 'Código de status' },
		message: { type: 'string', description: 'Mensagem de erro' },
		error: { type: 'string', description: 'Descrição do erro' }
	}
}
