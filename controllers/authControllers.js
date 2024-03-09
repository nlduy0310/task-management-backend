import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
let controllers = {};

controllers.handleLogin = async (req, res, next) => {
	let { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ error: 'Both email and password are required' });

	const foundUser = await User.findOne({ email: email }).exec();
	if (!foundUser) return res.status(401).json({ error: 'Invalid email and password' });

	const passwordMatch = await bcrypt.compare(password, foundUser.password);

	if (passwordMatch) {
		const accessToken = jwt.sign(
			{
				UserInfo: {
					email: foundUser.email,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		const refreshToken = jwt.sign(
			{
				UserInfo: {
					email: foundUser.email,
				},
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		foundUser.refreshToken = refreshToken;
		await foundUser.save();

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 24 * 60 * 60 * 1000,
		});
		return res.json({ accessToken });
	} else {
		res.status(401).json({ error: 'Invalid email and password' });
	}
};

export default controllers;
