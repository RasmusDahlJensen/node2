import db from "../Config/db.config.js";

class UserController {
	constructor() {
		console.log("User Controller initialized");
	}

	// Method for listing all users
	list = (req, res) => {
		const sql = "SELECT * FROM users";

		db.query(sql, (err, result) => {
			if (err) {
				console.error(err);
				res
					.status(500)
					.json({ error: "An error occurred while retrieving the user list." });
			} else {
				res.json(result);
			}
		});
	};

	// Method for creating a user
	create = (req, res) => {
		const {
			first_name,
			last_name,
			username,
			password,
			email,
			birthdate,
			gender,
		} = req.body;

		const sql =
			"INSERT INTO users (first_name, last_name, username, password, email, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?)";
		const values = [
			first_name,
			last_name,
			username,
			password,
			email,
			birthdate,
			gender,
		];

		db.query(sql, values, (err, result) => {
			if (err) {
				console.error(err);
				res
					.status(500)
					.json({ error: "An error occurred while creating the user." });
			} else {
				res.json({ message: "User created successfully." });
			}
		});
	};
}

export default UserController;
