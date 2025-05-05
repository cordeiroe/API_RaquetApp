import connectToMongoDB from '../src/config/database.js'

async function testDbConnection () {
	try {
		await connectToMongoDB()
		console.log('Test connection successful')
	} catch (error) {
		console.error('Test connection failed:', error.message)
		process.exit(1)
	}
}

testDbConnection()
