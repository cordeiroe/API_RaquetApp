import bcrypt from 'bcrypt'
import User from '../../models/User.js'

const createUser = async (request, reply) => {
	try {
		const {
			name, email, password, role, phone
		} = request.body

		const existUser = await User.findOne({ email })

		if (existUser) {
			return reply.code(409).send({
				statusCode: 409,
				message: 'Usuário/email já cadastrado',
				error: 'ConflictError'
			})
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(password, saltRounds)

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
			phone
		})

		return reply.code(201).send({
			message: 'Usuário criado com sucesso',
			id: newUser._id,
			createdAt: newUser.createdAt,
			updatedAt: newUser.updatedAt
		})
	} catch (error) {
		if (error.code === 11000) {
			return reply.code(400).send({
				message: 'Usuário/email já cadastrado',
				error: 'ConflictError'
			})
		}

		if (error.name === 'ValidationError') {
			return reply.code(400).send({
				message: 'Erro ao criar usuário',
				error: 'ValidationError'
			})
		}

		return reply.code(500).send({
			message: 'Erro ao criar usuário',
			error: error.message
		})
	}
}

const getUsers = async (request, reply) => {
	try {
		const { page = 1, limit = 10 } = request.query

		const pageNum = parseInt(page)
		const limitNum = parseInt(limit)

		const skipIndex = (pageNum - 1) * limitNum

		const paginatedUsers = await User.find()
			.select('-password')
			.skip(skipIndex)
			.limit(limitNum)
			.sort({ createdAt: -1 })

		const totalUsers = await User.countDocuments()

		return reply.code(200).send({
			message: 'Usuários encontrados com sucesso',
			totalUsers,
			page: parseInt(page),
			limit: parseInt(limit),
			data: paginatedUsers
		})
	} catch (error) {
		return reply.code(500).send({
			message: 'Erro ao buscar usuários',
			error: error.message
		})
	}
}

export { createUser, getUsers }
