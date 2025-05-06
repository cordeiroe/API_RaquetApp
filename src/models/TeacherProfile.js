import mongoose from 'mongoose'

const teacherProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true
	},
	bio: {
		type: String,
		required: true,
		maxLength: 1000
	},
	experience: {
		type: Number,
		required: true,
		min: 0
	},
	sports: [{
		type: String,
		enum: ['tennis', 'squash', 'pickleball', 'padel', 'beach_tennis']
	}],
	skillLevel: {
		type: String,
		enum: ['beginner', 'intermediate', 'advanced', 'expert'],
		required: true
	},
	teachingLevels: [{
		type: String,
		enum: ['beginner', 'intermediate', 'advanced', 'expert']
	}],
	teachingAges: [{
		type: String,
		enum: ['children', 'adults', 'seniors']
	}],
	location: {
		type: {
			type: String,
			default: 'Point',
			enum: ['Point']
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	address: {
		street: String,
		city: String,
		state: String,
		zipCode: String,
		country: String
	},
	hourlyRate: {
		type: Number,
		required: true,
		min: 0
	},
	availability: {
		monday: [{ start: String, end: String }],
		tuesday: [{ start: String, end: String }],
		wednesday: [{ start: String, end: String }],
		thursday: [{ start: String, end: String }],
		friday: [{ start: String, end: String }],
		saturday: [{ start: String, end: String }],
		sunday: [{ start: String, end: String }]
	},
	ratings: {
		average: {
			type: Number,
			default: 0,
			min: 0,
			max: 5
		},
		count: {
			type: Number,
			default: 0
		}
	},
	classPreferences: {
		minDuration: {
			type: Number, // Duração mínima em minutos
			default: 60
		},
		groupClasses: {
			type: Boolean,
			default: false
		},
		maxStudentsPerGroup: {
			type: Number,
			default: 1
		}
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	isActive: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

teacherProfileSchema.index({ location: '2dsphere' })

const TeacherProfile = mongoose.model('TeacherProfile', teacherProfileSchema)

export default TeacherProfile
