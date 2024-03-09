import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
		default: 'User',
	},
	imageUrl: {
		type: String,
		required: true,
		default: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
	},
	refreshToken: String,
});

export default model('User', userSchema);
