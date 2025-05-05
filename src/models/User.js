import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	role: {
		type: String,
		required: true,
		enum: ['student', 'teacher', 'admin']
	},
	phone: {
		type: String,
		required: true,
		minlength: 11,
		maxlength: 15
	}
}, {
	timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
