import {
	createTeacherProfile,
	getTeacherProfile,
	updateTeacherProfile,
	deleteTeacherProfile,
	searchTeacherProfile
} from './teachers.controller.js'
import teacherSchema from './teachers.schema.js'

export default async function (fastify, opts) {
	fastify.post('/', {
		onRequest: [fastify.authenticate],
		schema: teacherSchema.createTeacherProfile,
		handler: createTeacherProfile
	})

	fastify.get('/', {
		onRequest: [fastify.authenticate],
		schema: teacherSchema.getTeacherProfile,
		handler: getTeacherProfile
	})

	fastify.put('/', {
		onRequest: [fastify.authenticate],
		schema: teacherSchema.updateTeacherProfile,
		handler: updateTeacherProfile
	})

	fastify.delete('/', {
		onRequest: [fastify.authenticate],
		schema: teacherSchema.deleteTeacherProfile,
		handler: deleteTeacherProfile
	})

	fastify.get('/search', {
		schema: teacherSchema.searchTeacherProfile,
		handler: searchTeacherProfile
	})
}
