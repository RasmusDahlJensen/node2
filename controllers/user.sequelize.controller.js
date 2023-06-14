import UserModel from "../model/userModelSequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class UserController {
	constructor() {
		this.userModel = UserModel;
		console.log("User Controller initialized");
	}

	async list(req, res) {
		try {
			const users = await this.userModel.findAll();
			res.json(users);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		const user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			birthdate: req.body.birthdate,
			gender: req.body.gender,
		};

		try {
			const createdUser = await this.userModel.create(user);
			const userId = createdUser.user_id;
			res.json({ userId, message: "User created successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		const userId = req.params.userId;

		try {
			const deletedUser = await this.userModel.destroy({
				where: { user_id: userId },
			});
			if (deletedUser === 0) {
				throw new Error("User not found.");
			}
			res.json({ message: "User deleted successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async update(req, res) {
		const userId = req.params.userId;
		const user = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			birthdate: req.body.birthdate,
			gender: req.body.gender,
		};

		try {
			const updatedUser = await this.userModel.update(user, {
				where: { user_id: userId },
			});
			if (updatedUser[0] === 0) {
				throw new Error("User not found.");
			}
			res.json({ message: "User updated successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async getUserDetails(req, res) {
		const userId = req.params.userId;

		try {
			const user = await this.userModel.findByPk(userId);
			if (!user) {
				throw new Error("User not found.");
			}
			res.json(user);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	//Login portion
	async login(req, res) {
		const { username, password } = req.body;

		try {
			// Find the user by username
			const user = await this.userModel.findOne({ where: { username } });
			if (!user) {
				return res.status(401).json({ error: "Invalid username or password" });
			}

			// Compare the provided password with the stored hashed password
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res.status(401).json({ error: "Invalid username or password" });
			}

			// Generate a JWT token
			const token = jwt.sign(
				{ userId: user.user_id, username: user.username },
				process.env.SECRET_KEY
			);

			// Return the token, username, and user ID in the response
			return res.json({
				accessToken: token,
				username: user.username,
				userId: user.user_id,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async protected(req, res, next) {
		console.log("Calling verify token");
	}
}

export default UserController;
