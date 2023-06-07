import db from "../Config/db.config.js";

class SongController {
	constructor() {
		console.log("Song Controller initialized");
	}

	// Method for listing songs with optional sort order
	list = (req, res) => {
		const sortOrder = req.query.sortOrder || "asc";
		let sql =
			"SELECT s.id, s.title, a.name FROM song s JOIN artist a ON s.artist_id = a.id";

		// Append the sort order to the SQL query
		if (sortOrder.toLowerCase() === "desc") {
			sql += " ORDER BY s.title DESC";
		} else {
			sql += " ORDER BY s.title ASC";
		}

		db.query(sql, (err, result) => {
			if (err) {
				console.error(err);
			} else {
				res.json(result);
			}
		});
	};

	// Method for retrieving song details
	details = (req, res) => {
		const id = req.params.id || 0;
		const sql =
			"SELECT s.title, s.content, a.name FROM song s JOIN artist a ON s.artist_id = a.id WHERE s.id = ?";
		db.query(sql, [id], (err, result) => {
			if (err) {
				console.error(err);
			} else {
				res.json(result);
			}
		});
	};
	// Method for deleting an artist
	deleteArtist = (req, res) => {
		const id = req.params.id;

		const sql = "DELETE FROM artist WHERE id = ?";
		db.query(sql, [id], (err, result) => {
			if (err) {
				console.error(err);
				res
					.status(500)
					.json({ error: "An error occurred while deleting the artist." });
			} else {
				res.json({ message: "Artist deleted successfully." });
			}
		});
	};

	//Method for creating an artist
	createArtist = (req, res) => {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Name is required." });
		}

		const sql = "INSERT INTO artist (name) VALUES (?)";
		db.query(sql, [name], (err, result) => {
			if (err) {
				console.error(err);
				res
					.status(500)
					.json({ error: "An error occurred while creating the artist." });
			} else {
				res.json({ message: "Artist created successfully." });
			}
		});
	};

	// Method for updating an artist
	updateArtist = (req, res) => {
		const id = req.params.id;
		const { name } = req.body;

		const sql = "UPDATE artist SET name = ? WHERE id = ?";
		db.query(sql, [name, id], (err, result) => {
			if (err) {
				console.error(err);
				res
					.status(500)
					.json({ error: "An error occurred while updating the artist." });
			} else {
				res.json({ message: "Artist updated successfully." });
			}
		});
	};
}

export default SongController;
