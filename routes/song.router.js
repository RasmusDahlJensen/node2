import express from "express";
import SongController from "../controllers/song.controller.js";

const controller = new SongController();
const SongRouter = express.Router();

// Endpoint for listing songs with optional sort order
SongRouter.get("/song", (req, res) => {
	console.log("Handling song list request (GET)");
	const sortOrder = req.query.sortOrder || "asc"; // Get the sortOrder from the query parameters
	controller.list(req, res, sortOrder); // Pass the sortOrder to the list method
});

// Endpoint for retrieving song details
SongRouter.get("/song/:id([0-9]*)", (req, res) => {
	console.log("Handling song details request (GET)");
	controller.details(req, res);
});

export default SongRouter;
