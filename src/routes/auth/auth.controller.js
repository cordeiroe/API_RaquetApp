import User from '../../models/User.js'
import bcrypt from 'bcrypt'

const login = async (request, reply) => {
	try {
		const { email, password } = request.body

		const user = await User.findOne({ email })

		if (!user) {
			return reply.code(401).send({
				message: 'Usuário não encontrado',
				error: 'Unauthorized',
				statusCode: 401
			})
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return reply.code(401).send({
				message: 'Senha inválida',
				error: 'Unauthorized',
				statusCode: 401
			})
		}

		const token = request.server.jwt.sign({
			id: user._id,
			email: user.email,
			role: user.role,
			name: user.name
		})

		return reply.code(200).send({
			message: 'Login realizado com sucesso',
			token,
			user: {
				id: user._id,
				email: user.email,
				role: user.role,
				name: user.name
			}
		})
	} catch (error) {
		return reply.code(500).send({
			statusCode: 500,
			error: error.message,
			message: 'Erro ao fazer login'
		})
	}
}

export { login }
