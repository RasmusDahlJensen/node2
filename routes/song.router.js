// Import the necessary modules
import express from "express";
import SongController from "../controllers/song.controller.js";

// Create an instance of the SongController
const controller = new SongController();

// Create a new router using Express
const SongRouter = express.Router();

// Endpoint for listing songs
SongRouter.get("/song", (req, res) => {
	console.log("Handling song list request (GET)");
	controller.list(req, res);
});

// Endpoint for retrieving song details
SongRouter.get("/song/:id([0-9]*)", (req, res) => {
	console.log("Handling song details request (GET)");
	controller.details(req, res);
});

// Export the router for use in other modules
export default SongRouter;
