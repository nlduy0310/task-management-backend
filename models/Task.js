import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
	name: {
		type: String,
		required: true,
		default: 'New task',
	},
	completed: {
		type: Boolean,
		required: true,
		default: false,
	},
	remindDate: Date,
	dueDate: Date,
	assignees: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: [],
	},
	note: {
		type: String,
		default: '',
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	myDayList: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: [],
	},
	importantList: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: [],
	},
});

export default model('Task', taskSchema);
