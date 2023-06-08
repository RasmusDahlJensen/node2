// controllers/user.controller.js
import UserModel from "../model/userModel.js";

class UserController {
	constructor() {
		this.userModel = new UserModel();
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
			const userId = await this.userModel.create(user);
			res.json({ userId, message: "User created successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async delete(req, res) {
		const userId = req.params.userId;

		try {
			await this.userModel.delete(userId);
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
			await this.userModel.update(userId, user);
			res.json({ message: "User updated successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}
}

export default UserController;
