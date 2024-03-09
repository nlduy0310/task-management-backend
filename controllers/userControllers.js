import User from '../models/User.js';
let controllers = {};

controllers.getUserInfo = async (req, res) => {
	let foundUser = await User.findOne({ email: req.userEmail }).exec();

	if (!foundUser) return res.sendStatus(404);

	return res.status(200).json({
		id: foundUser._id,
		email: foundUser.email,
		displayName: foundUser.displayName,
		imageUrl: foundUser.imageUrl,
	});
};

controllers.getUserInfoById = async (req, res) => {
	let id = req.params.id;

	let foundUser = await User.findById(id).exec();
	if (!foundUser) return res.sendStatus(404);

	return res.status(200).json({
		id: foundUser._id,
		email: foundUser.email,
		displayName: foundUser.displayName,
		imageUrl: foundUser.imageUrl,
	});
};

export default controllers;
