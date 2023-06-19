import dotenv from "dotenv";
import SongRouter from "./routes/song.router.js";
import express from "express";
// import UserRouter from "./routes/user.router.js"; //Not sequelize
import UserRouter from "./routes/user.router.sequelize.js"; //Sequelize

dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT;

// Parse request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Home route
app.get("/", (req, res) => {
	res.send("Forside");
});

// About route
app.get("/about", (req, res) => {
	res.send("About");
});

// Contact route
app.get("/contact", (req, res) => {
	res.send("Contact");
});

// Products route
app.get("/products", (req, res) => {
	res.send("Products");
});

// Register SongRouter for handling song-related routes
app.use(SongRouter);

// Register UserRouter for handling user-related routes
app.use(UserRouter);

// 404 Error handler
app.use((req, res, next) => {
	res.status(404).send("404 No page found");
});

// Start the server
app.listen(port, () => {
	console.log(`Express app http://localhost:${port}`);
});
