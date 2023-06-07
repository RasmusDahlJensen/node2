import express from "express";
import SongController from "../controllers/song.controller.js";

const controller = new SongController();
const SongRouter = express.Router();

// Endpoint for listing songs with optional sort order
// Example of using query localhost:3000/song?sortOrder=asc for ascending sorting
SongRouter.get("/song", (req, res) => {
	console.log("Handling song list request (GET)");
	const sortOrder = req.query.sortOrder || "asc";
	controller.list(req, res, sortOrder);
});

// Endpoint for retrieving song details
SongRouter.get("/song/:id([0-9]*)", (req, res) => {
	console.log("Handling song details request (GET)");
	controller.details(req, res);
});

// Endpoint for deleting an artist
// Example: DELETE localhost:3000/artist/delete/1
SongRouter.delete("/artist/delete/:id([0-9]*)", (req, res) => {
	console.log("Handling artist deletion request (DELETE)");
	controller.deleteArtist(req, res);
});

//Endpoint  for creating an artist
//Send postman request with "name" as a key and the actual name as a value
SongRouter.post("/artist/create", (req, res) => {
	console.log("Handling artist creation request (POST)");
	controller.createArtist(req, res);
});

// Endpoint for updating an artist
//Send postman request with "name" as a key and the actual name as a value just like previous
SongRouter.put("/artist/update/:id([0-9]*)", (req, res) => {
	console.log("Handling artist update request (PUT)");
	controller.updateArtist(req, res);
});

export default SongRouter;
