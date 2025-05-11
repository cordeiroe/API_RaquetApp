// src/models/Location.js
import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
		required: true,
		enum: ['CLUBE', 'QUADRA_PUBLICA', 'ACADEMIA', 'OUTRO'],
		default: 'CLUBE'
	},
	address: {
		street: {
			type: String,
			required: true,
			trim: true
		},
		number: {
			type: String,
			required: true,
			trim: true
		},
		neighborhood: {
			type: String,
			required: true,
			trim: true
		},
		city: {
			type: String,
			required: true,
			trim: true
		},
		state: {
			type: String,
			required: true,
			trim: true,
			uppercase: true
		},
		country: {
			type: String,
			required: true,
			trim: true,
			default: 'BRASIL'
		},
		zipCode: {
			type: String,
			required: true,
			trim: true
		}
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	contact: {
		phone: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		website: {
			type: String,
			trim: true
		}
	},
	businessHours: [{
		day: {
			type: Number,
			required: true,
			min: 0,
			max: 6
		},
		open: {
			type: String,
			required: true
		},
		close: {
			type: String,
			required: true
		},
		isOpen: {
			type: Boolean,
			default: true
		}
	}],
	sports: [{
		type: String,
		enum: ['TENIS', 'SQUASH', 'BADMINTON', 'PADEL', 'BEACH_TENNIS'],
		required: true
	}],
	courts: [{
		name: {
			type: String,
			required: true,
			trim: true
		},
		sport: {
			type: String,
			enum: ['TENIS', 'SQUASH', 'BADMINTON', 'PADEL', 'BEACH_TENNIS'],
			required: true
		},
		type: {
			type: String,
			enum: ['SAIBRO', 'SINTETICA', 'CIMENTO', 'GRAMA', 'OUTRO'],
			required: true
		},
		capacity: {
			type: Number,
			default: 2
		},
		features: [String],
		status: {
			type: String,
			enum: ['DISPONIVEL', 'MANUTENCAO', 'RESERVADO'],
			default: 'DISPONIVEL'
		}
	}],
	rating: {
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
	photos: [{
		url: String,
		description: String,
		isMain: Boolean
	}],
	isActive: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

// Apenas índices essenciais
locationSchema.index({ location: '2dsphere' })
locationSchema.index({ 'address.city': 1, 'address.state': 1 })

const Location = mongoose.model('Location', locationSchema)

export default Location
