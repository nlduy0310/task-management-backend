const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_DOMAIN];

const corsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

export default corsOptions;
