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

const getTeacherProfile = async (request, reply) => {
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

		const teacherProfile = await TeacherProfile.findOne({ user: userId })

		if (!teacherProfile) {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError'
			})
		}

		return reply.code(200).send({
			message: 'Perfil de professor encontrado com sucesso',
			teacherProfile
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return reply.code(400).send({
				message: 'ID de usuário inválido',
				error: 'InvalidIdError',
				statusCode: 400
			})
		}

		if (error.name === 'NotFoundError') {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError'
			})
		}

		return reply.code(500).send({
			message: 'Erro ao buscar perfil de professor',
			error: error.message,
			statusCode: 500
		})
	}
}

const updateTeacherProfile = async (request, reply) => {
	try {
		const userId = request.user.id

		const user = await User.findById(userId)

		if (!user) {
			return reply.code(404).send({
				message: 'Usuário não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		if (user.role !== 'teacher') {
			return reply.code(403).send({
				message: 'Perfil de usuário diferente de professor',
				error: 'ForbiddenError',
				statusCode: 403
			})
		}

		const teacherProfile = await TeacherProfile.findOne({ user: userId })
			.populate('user', '-password')

		if (!teacherProfile) {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		const updatedProfile = await TeacherProfile.findByIdAndUpdate(
			teacherProfile._id,
			request.body,
			{ new: true }
		)

		return reply.code(200).send({
			message: 'Perfil de professor atualizado com sucesso',
			updatedProfile
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return reply.code(400).send({
				message: 'ID de perfil de professor inválido',
				error: 'InvalidIdError',
				statusCode: 400
			})
		}

		if (error.name === 'NotFoundError') {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		return reply.code(500).send({
			message: 'Erro ao atualizar perfil de professor',
			error: error.message,
			statusCode: 500
		})
	}
}

const deleteTeacherProfile = async (request, reply) => {
	try {
		const userId = request.user.id

		const user = await User.findById(userId)

		if (!user) {
			return reply.code(404).send({
				message: 'Usuário não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		if (user.role !== 'teacher') {
			return reply.code(403).send({
				message: 'Perfil de usuário diferente de professor',
				error: 'ForbiddenError',
				statusCode: 403
			})
		}

		const teacherProfile = await TeacherProfile.findOne({ user: userId })
			.populate('user', '-password')

		if (!teacherProfile) {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		await TeacherProfile.deleteOne({ _id: teacherProfile._id })

		return reply.code(200).send({
			message: 'Perfil de professor deletado com sucesso',
			statusCode: 200
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return reply.code(400).send({
				message: 'ID de usuário inválido',
				error: 'InvalidIdError',
				statusCode: 400
			})
		}

		if (error.name === 'NotFoundError') {
			return reply.code(404).send({
				message: 'Perfil de professor não encontrado',
				error: 'NotFoundError',
				statusCode: 404
			})
		}

		return reply.code(500).send({
			message: 'Erro ao deletar perfil de professor',
			error: error.message,
			statusCode: 500
		})
	}
}

const searchTeacherProfile = async (request, reply) => {
	try {
		const { name, sports, skillLevel, hourlyRate } = request.query

		const query = {}

		if (sports) {
			query.sports = { $in: [sports] }
		}

		if (skillLevel) {
			query.skillLevel = { $regex: [skillLevel], $options: 'i' }
		}

		if (hourlyRate) {
			query.hourlyRate = { $lte: parseInt(hourlyRate) }
		}

		let teachersProfiles

		if (name) {
			teachersProfiles = await TeacherProfile.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'userData'
					}
				},
				{
					$match: {
						'userData.name': { $regex: name, $options: 'i' },
						...query
					}
				},
				{
					$project: {
						'userData.password': 0
					}
				}

			])
		} else {
			teachersProfiles = await TeacherProfile.find(query).populate('user', '-password')
		}

		return reply.code(200).send({
			message: 'Professores encontrados com sucesso',
			count: teachersProfiles.length,
			data: teachersProfiles
		})
	} catch (error) {
		if (error.name === 'CastError') {
			return reply.code(400).send({
				message: 'ID de perfil de professor inválido',
				error: 'InvalidIdError',
				statusCode: 400
			})
		}

		return reply.code(500).send({
			message: 'Erro ao buscar perfil de professor',
			error: error.message,
			statusCode: 500
		})
	}
}

export {
	createTeacherProfile,
	getTeacherProfile,
	updateTeacherProfile,
	deleteTeacherProfile,
	searchTeacherProfile
}
