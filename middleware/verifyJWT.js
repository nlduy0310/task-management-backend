import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		//console.log('Can not find authorization header');
		return res.sendStatus(401);
	}
	//(authHeader);
	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);
		req.userEmail = decoded.UserInfo.email;
		next();
	});
};

export default verifyJWT;
