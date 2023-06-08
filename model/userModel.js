import db from "../Config/db.config.js";

class UserModel {
	constructor() {
		this.tableName = "users";
	}

	findAll() {
		return new Promise((resolve, reject) => {
			const sql = `SELECT user_id, first_name, last_name, username, password, email, birthdate, gender FROM ${this.tableName}`;

			db.query(sql, (err, result) => {
				if (err) {
					console.error(err);
					reject(
						new Error("An error occurred while retrieving the user list.")
					);
				} else {
					resolve(result);
				}
			});
		});
	}

	create(user) {
		return new Promise((resolve, reject) => {
			const sql = `INSERT INTO ${this.tableName} (first_name, last_name, username, password, email, birthdate, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;
			const values = [
				user.first_name,
				user.last_name,
				user.username,
				user.password,
				user.email,
				user.birthdate,
				user.gender,
			];

			db.query(sql, values, (err, result) => {
				if (err) {
					console.error(err);
					reject(new Error("An error occurred while creating the user."));
				} else {
					resolve(result.insertId);
				}
			});
		});
	}

	delete(userId) {
		return new Promise((resolve, reject) => {
			const sql = `DELETE FROM ${this.tableName} WHERE user_id = ?`;
			const values = [userId];

			db.query(sql, values, (err, result) => {
				if (err) {
					console.error(err);
					reject(new Error("An error occurred while deleting the user."));
				} else if (result.affectedRows === 0) {
					reject(new Error("User not found."));
				} else {
					resolve();
				}
			});
		});
	}
}

export default UserModel;
