import { createTeacherProfile } from './teachers.controller.js'

export default async function (fastify, opts) {
	fastify.post('/', {
		onRequest: [fastify.authenticate],
		handler: createTeacherProfile
	})

	// To-do:
	// - Rota para buscar perfil de professor
	// - Rota para atualizar perfil de professor
	// - Rota para deletar perfil de professor
}
