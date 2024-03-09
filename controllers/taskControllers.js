import Task from '../models/Task.js';
import User from '../models/User.js';

let controllers = {};

controllers.getUserTasks = async (req, res) => {
	let id = req.params.id;

	let foundUser = await User.findById(id).exec();
	if (!foundUser) return res.sendStatus(404);

	if (foundUser.email !== req.userEmail) return res.sendStatus(403);

	let result = await Task.find({
		$or: [
			{ createdBy: id },
			{
				assignees: {
					$elemMatch: {
						$eq: id,
					},
				},
			},
		],
	});

	res.status(200).json(result);
};

controllers.updateTaskById = async (req, res) => {
	const id = req.params.id;
	const updateInfo = req.body;

	const result = await Task.findByIdAndUpdate(id, updateInfo).exec();

	if (!result) return res.sendStatus(404);

	return res.sendStatus(200);
};

controllers.createTask = async (req, res) => {
	const userEmail = req.userEmail;

	const foundUser = await User.findOne({ email: userEmail }).exec();
	if (!foundUser) return res.sendStatus(403);
	const createdBy = foundUser._id;

	const { name, completed, remindDate, dueDate, assignees, note, myDayList, importantList } =
		req.body;

	if (!name) return res.sendStatus(400);

	const createdTask = await Task.create({
		name,
		completed: completed ?? false,
		...(remindDate && { remindDate }),
		...(dueDate && { dueDate }),
		assignees: assignees ?? [],
		note: note ?? '',
		createdBy,
		myDayList: myDayList ?? [],
		importantList: importantList ?? [],
	});

	if (!createdTask) return res.sendStatus(500);
	return res.sendStatus(200);
};

export default controllers;
