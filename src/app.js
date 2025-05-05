import path from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoLoad from '@fastify/autoload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {}

export default async function (fastify, opts) {
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: { ...opts }
	})

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: { ...opts }
	})
}

export { options }
