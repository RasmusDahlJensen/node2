import express from "express";
import UserController from "../controllers/user.sequelize.controller.js";

const controller = new UserController();
const UserRouter = express.Router();

// Endpoint for listing users
UserRouter.get("/users", (req, res) => {
	console.log("Handling user list request (GET)");
	const sortOrder = req.query.sortOrder || "asc";
	controller.list(req, res, sortOrder);
});

// Endpoint for retrieving user details
UserRouter.get("/users/:userId([0-9]*)", (req, res) => {
	console.log("Handling user details request (GET)");
	controller.getUserDetails(req, res);
});

// Endpoint for creating a user
UserRouter.post("/users/create", (req, res) => {
	console.log("Handling user creation request (POST)");
	controller.create(req, res);
});

// Endpoint for deleting a user
UserRouter.delete("/users/:userId([0-9]*)", (req, res) => {
	console.log("Handling user deletion request (DELETE)");
	controller.delete(req, res);
});

// Endpoint for updating a user
UserRouter.put("/users/:userId([0-9]*)", (req, res) => {
	console.log("Handling user update request (PUT)");
	controller.update(req, res);
});

export default UserRouter;
