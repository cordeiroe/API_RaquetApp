import { errorResponse } from '../../schemas/common.js'

const teacherProfileProperties = {
	bio: { type: 'string', minLength: 10, maxLength: 1000 },
	experience: { type: 'integer', minimum: 0 },
	sports: {
		type: 'array',
		items: {
			type: 'string',
			enum: ['tennis', 'squash', 'pickleball', 'padel', 'beach_tennis'],
			description: 'Esportes que o professor ensina'
		}
	},
	skillLevel: {
		type: 'string',
		enum: ['beginner', 'intermediate', 'advanced', 'expert'],
		description: 'Nível de habilidade do professor'
	},
	teachingLevels: {
		type: 'array',
		items: {
			type: 'string',
			enum: ['beginner', 'intermediate', 'advanced', 'expert'],
			description: 'Nível de habilidade do professor'
		}
	},
	teachingAges: {
		type: 'array',
		items: {
			type: 'string',
			enum: ['children', 'adults', 'seniors'],
			description: 'Idade dos alunos que o professor ensina'
		}
	},
	location: {
		type: 'object',
		properties: {
			type: { type: 'string', enum: ['Point'] },
			coordinates: {
				type: 'array',
				minItems: 2,
				maxItems: 2,
				items: { type: 'number' },
				description: 'Coordenadas do professor'
			}
		}
	},
	address: {
		type: 'object',
		description: 'Endereço do professor',
		properties: {
			street: { type: 'string' },
			city: { type: 'string' },
			state: { type: 'string' },
			zipCode: { type: 'string' },
			country: { type: 'string' }
		}
	},
	hourlyRate: { type: 'number', minimum: 0 },
	availability: {
		type: 'object',
		properties: {
			monday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			tuesday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			wednesday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			thursday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			friday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			saturday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			},
			sunday: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						start: { type: 'string' },
						end: { type: 'string' }
					},
					description: 'Horário de disponibilidade'
				}
			}
		}
	},
	classPreferences: {
		type: 'object',
		description: 'Preferências de classe',
		properties: {
			minDuration: { type: 'integer', minimum: 30 },
			groupClasses: { type: 'boolean' },
			maxStudentsPerGroup: { type: 'integer', minimum: 1 }
		}
	}
}

const teacherProfileSchema = {
	type: 'object',
	required: ['bio', 'experience', 'sports', 'skillLevel', 'location', 'hourlyRate'],
	properties: teacherProfileProperties
}

const teacherProfileResponseSchema = {
	type: 'object',
	description: 'Perfil do professor',
	properties: {
		...teacherProfileProperties,
		_id: { type: 'string' },
		user: { type: 'string' },
		createdAt: { type: 'string', format: 'date-time' },
		updatedAt: { type: 'string', format: 'date-time' },
		isVerified: { type: 'boolean' },
		isActive: { type: 'boolean' },
		ratings: {
			type: 'object',
			properties: {
				average: { type: 'number' },
				count: { type: 'integer' }
			}
		}
	}
}

const teacherSchema = {
	createTeacherProfile: {
		tags: ['Teachers'],
		description: 'Criar perfil de professor',
		body: teacherProfileSchema,
		response: {
			201: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					profileId: { type: 'string' },
					createdAt: { type: 'string', format: 'date-time' }
				}
			},
			400: errorResponse,
			403: errorResponse,
			404: errorResponse,
			409: errorResponse,
			500: errorResponse
		}
	},

	getTeacherProfile: {
		tags: ['Teachers'],
		description: 'Obter perfil do professor autenticado',
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					teacherProfile: teacherProfileResponseSchema
				}
			},
			400: errorResponse,
			403: errorResponse,
			404: errorResponse,
			500: errorResponse
		}
	},

	updateTeacherProfile: {
		tags: ['Teachers'],
		description: 'Atualizar perfil de professor',
		body: {
			type: 'object',
			properties: teacherProfileProperties
		},
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					updatedProfile: teacherProfileResponseSchema
				}
			},
			400: errorResponse,
			403: errorResponse,
			404: errorResponse,
			500: errorResponse
		}
	},

	deleteTeacherProfile: {
		tags: ['Teachers'],
		description: 'Excluir perfil de professor',
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					statusCode: { type: 'number' }
				}
			},
			400: errorResponse,
			403: errorResponse,
			404: errorResponse,
			500: errorResponse
		}
	},

	searchTeacherProfile: {
		tags: ['Teachers'],
		description: 'Buscar perfis de professores',
		querystring: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				sports: { type: 'string' },
				skillLevel: { type: 'string' },
				hourlyRate: { type: 'string' }
			}
		},
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					count: { type: 'number' },
					data: {
						type: 'array',
						items: teacherProfileResponseSchema
					}
				}
			},
			400: errorResponse,
			500: errorResponse
		}
	}
}

export default teacherSchema
