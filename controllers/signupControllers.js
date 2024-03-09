import User from '../models/User.js';
import { hash } from 'bcrypt';

let controllers = {};

controllers.handleNewUser = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Both email and password are required' });
	}

	const duplicate = await User.findOne({ email: email }).exec();
	if (duplicate) return res.status(409).json({ error: 'This email has already been used' });

	try {
		const hashedPassword = await hash(password, 10);
		const result = await User.create({
			email: email,
			password: hashedPassword,
			displayName: 'User',
			imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
		});
		//(`Account created ${result}`);
		return res.status(200).json({ success: 'Account created' });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export default controllers;
