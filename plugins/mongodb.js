import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import connectToMongoDB from '../src/config/database'

export default fp(async (fastify) => {
	await connectToMongoDB()
	fastify.decorate('mongo', mongoose)
})
