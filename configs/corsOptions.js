const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
	credentials: true,
	origin: allowedOrigins,
};

export default corsOptions;
