import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
