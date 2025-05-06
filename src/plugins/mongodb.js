import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function mongodbPlugin (fastify, options) {
	const uri = process.env.MONGO_URI || `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`

	try {
		await mongoose.connect(uri)
		fastify.log.info('MongoDB conectado com sucesso')

		fastify.decorate('mongoose', mongoose)

		fastify.addHook('onClose', async (instance) => {
			await mongoose.connection.close()
			instance.log.info('Conexão MongoDB encerrada')
		})
	} catch (error) {
		fastify.log.error(`Erro ao conectar ao MongoDB: ${error.message}`)
		fastify.log.error(uri)
		process.exit(1)
	}
}

export default fp(mongodbPlugin, {
	name: 'mongodb',
	fastify: '5.x'
})
