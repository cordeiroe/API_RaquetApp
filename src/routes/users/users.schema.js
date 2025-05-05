const errorResponse = {
	type: 'object',
	properties: {
		statusCode: { type: 'number', description: 'Código de status' },
		message: { type: 'string', description: 'Mensagem de erro' },
		error: { type: 'string', description: 'Descrição do erro' }
	}
}

const userSchema = {
	createUser: {
		body: {
			type: 'object',
			required: ['name', 'email', 'password', 'role'],
			properties: {
				name: {
					type: 'string', minLength: 3, maxLength: 100, description: 'Nome completo do usuário'
				},
				email: { type: 'string', format: 'email', description: 'Email do usuário' },
				password: {
					type: 'string', minLength: 8, description: 'Senha do usuário', pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
				},
				role: { type: 'string', enum: ['student', 'teacher', 'admin'], description: 'Papel do usuário' }
			}
		},
		response: {
			201: {
				type: 'object',
				properties: {
					message: { type: 'string', description: 'Mensagem de sucesso' },
					id: { type: 'string', description: 'ID do usuário' },
					createdAt: { type: 'string', format: 'date-time', description: 'Data de criação do usuário' },
					updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização do usuário' }
				}
			},
			400: {
				...errorResponse,
				description: 'Erro de validação',
				example: {
					statusCode: 400,
					message: 'Erro de validação',
					error: 'ValidationError'
				}
			},
			409: {
				...errorResponse,
				description: 'Erro de conflito',
				example: {
					statusCode: 409,
					message: 'Usuário/email já cadastrado',
					error: 'ConflictError'
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
	},
	getUsers: {
		query: {
			type: 'object',
			properties: {
				page: {
					type: 'number', default: 1, minimum: 1, description: 'Página atual'
				},
				limit: {
					type: 'number', default: 10, minimum: 1, maximum: 100, description: 'Quantidade de itens por página'
				}
			}
		},
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string', description: 'Mensagem de sucesso' },
					total: { type: 'number', description: 'Total de usuários' },
					page: { type: 'number', description: 'Página atual' },
					limit: { type: 'number', description: 'Quantidade de itens por página' },
					data: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								id: { type: 'string', description: 'ID do usuário' },
								name: { type: 'string', description: 'Nome do usuário' },
								email: { type: 'string', description: 'Email do usuário' },
								role: { type: 'string', description: 'Papel do usuário' },
								createdAt: { type: 'string', format: 'date-time', description: 'Data de criação do usuário' },
								updatedAt: { type: 'string', format: 'date-time', description: 'Data de atualização do usuário' }
							}
						}
					}
				}
			},
			400: errorResponse,
			500: errorResponse
		}
	}
}

export default userSchema
