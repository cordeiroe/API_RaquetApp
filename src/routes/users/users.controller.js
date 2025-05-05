import bcrypt from 'bcrypt'

const users = []
let lastId = 0

const generateId = () => {
	lastId++

	return String(lastId)
}

const createUser = async (request, reply) => {
	try {
		const {
			name, email, password, role
		} = request.body

		const existUser = users.find((user) => user.email === email)

		if (existUser) {
			return reply.code(409).send({
				statusCode: 409,
				message: 'Usuário/email já cadastrado',
				error: 'ConflictError'
			})
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		const now = new Date().toISOString()

		const newUser = {
			id: generateId(),
			name,
			email,
			password: hashedPassword,
			role,
			createdAt: now,
			updatedAt: now
		}

		users.push(newUser)

		return reply.code(201).send({
			message: 'Usuário criado com sucesso',
			id: newUser.id,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt
		})
	} catch (error) {
		return reply.code(500).send({
			statusCode: 500,
			message: 'Erro ao criar usuário',
			error: error.message
		})
	}
}

const getUsers = async (request, reply) => {
	try {
		const { page = 1, limit = 10 } = request.query

		const startIndex = (page - 1) * limit
		const endIndex = page * limit

		const paginatedUsers = users.slice(startIndex, endIndex)

		const mappedUsers = paginatedUsers.map((user) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}))

		return reply.code(200).send({
			message: 'Usuários encontrados com sucesso',
			total: users.length,
			page: parseInt(page),
			limit: parseInt(limit),
			data: mappedUsers
		})
	} catch (error) {
		return reply.code(500).send({
			statusCode: 500,
			message: 'Erro ao buscar usuários',
			error: error.message
		})
	}
}

export { createUser, getUsers }
