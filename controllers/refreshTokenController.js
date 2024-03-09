import User from '../models/User.js';
import jwt from 'jsonwebtoken';
let controllers = {};

controllers.handleRefreshToken = async (req, res) => {
	// console.log('in refresh token handler')
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		// console.log(cookies);
		// console.log('No cookie or jwt found');
		return res.sendStatus(401);
	}
	const refreshToken = cookies.jwt;
	// console.log(`refreshToken found ${refreshToken}`);

	const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

	if (!foundUser) {
		// console.log('Can not find user with the given refresh token');
		return res.sendStatus(403);
	}

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || foundUser.email !== decoded.UserInfo.email) return res.sendStatus(403);
		const accessToken = jwt.sign(
			{
				UserInfo: {
					email: foundUser.email,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		res.json({ accessToken });
	});
};

export default controllers;
