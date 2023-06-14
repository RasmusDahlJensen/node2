import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.substring(7);
	console.log(token);
	if (!token) {
		return res.status(401).json({ error: "Token not provided" });
	}

	try {
		jwt.verify(token, process.env.SECRET_KEY);
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: "Invalid token" });
	}
};

export default verifyToken;
