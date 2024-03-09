import User from '../models/User.js';
let controllers = {};

controllers.handleSignout = async (req, res, next) => {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.sendStatus(204);
	}
	const refreshToken = cookies.jwt;

	const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
		return res.sendStatus(204);
	}

	foundUser.refreshToken = '';
	await foundUser.save();

	res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
	res.sendStatus(204);
};

export default controllers;
