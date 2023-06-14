import dotenv from "dotenv";
import SongRouter from "./routes/song.router.js";
import express from "express";
// import UserRouter from "./routes/user.router.js"; //Not sequelize
import UserRouter from "./routes/user.router.sequelize.js"; //Sequelize files currently being used

dotenv.config();

//Express
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.send("Forside");
});

app.get("/about", (req, res) => {
	res.send("About");
});

app.get("/contact", (req, res) => {
	res.send("Contact");
});

app.get("/products", (req, res) => {
	res.send("Products");
});
app.use(SongRouter);
app.use(UserRouter);

app.use((req, res, next) => {
	res.status(404).send("404 No page found");
});

app.listen(port, () => {
	console.log(`Express app http://localhost:${port}`);
});
