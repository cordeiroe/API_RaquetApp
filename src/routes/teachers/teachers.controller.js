import User from '../../models/User.js'
import TeacherProfile from '../../models/TeacherProfile.js'

const createTeacherProfile = async (request, reply) => {
	try {
		const userId = request.user.id

		const user = await User.findById(userId)

		if (!user) {
			return reply.code(404).send({
				message: 'Usuário não encontrado',
				error: 'NotFoundError'
			})
		}

		if (user.role !== 'teacher') {
			return reply.code(403).send({
				message: 'Perfil de usuário diferente de professor',
				error: 'ForbiddenError'
			})
		}

		const profileData = request.body

		const newProfile = await TeacherProfile.create({
			...profileData,
			user: userId
		})

		return reply.code(201).send({
			message: 'Perfil de professor criado com sucesso',
			profileId: newProfile._id,
			createdAt: newProfile.createdAt
		})
	} catch (error) {
		if (error.code === 11000) {
			return reply.code(409).send({
				message: 'Perfil de professor já existe',
				error: 'DuplicateError',
				statusCode: 409
			})
		}

		if (error.name === 'ValidationError') {
			return reply.code(400).send({
				message: 'Erro de validação',
				error: error.message,
				statusCode: 400
			})
		}

		return reply.code(500).send({
			message: 'Erro ao criar perfil de professor',
			error: error.message,
			statusCode: 500
		})
	}
}

export { createTeacherProfile }
