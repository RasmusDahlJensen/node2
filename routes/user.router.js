import express from "express";
import UserController from "../controllers/user.controller.js";
import UserModel from "../model/userModel.js";

const controller = new UserController(UserModel);
const UserRouter = express.Router();

// Endpoint for listing all users
UserRouter.get("/users", (req, res) => {
	console.log("Handling user list request (GET)");
	controller.list(req, res);
});

// Endpoint for creating a user
UserRouter.post("/users/create", (req, res) => {
	console.log("Handling user creation request (POST)");
	controller.create(req, res);
});

export default UserRouter;
