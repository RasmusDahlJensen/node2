class UserController {
	constructor(UserModel) {
		this.UserModel = UserModel;
		console.log("User Controller initialized");
	}

	// Method for listing all users
	list = async (req, res) => {
		try {
			const users = await this.UserModel.findAll();
			res.json(users);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: "An error occurred while retrieving the user list." });
		}
	};

	// Method for creating a user
	create = async (req, res) => {
		const {
			first_name,
			last_name,
			username,
			password,
			email,
			birthdate,
			gender,
		} = req.body;

		try {
			await this.UserModel.create({
				first_name,
				last_name,
				username,
				password,
				email,
				birthdate,
				gender,
			});
			res.json({ message: "User created successfully." });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ error: "An error occurred while creating the user." });
		}
	};
}

export default UserController;
