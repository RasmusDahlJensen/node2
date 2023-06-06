import dotenv from "dotenv";
import db from "./Config/db.config.js";
import SongRouter from "./routes/song.router.js";
import express from "express";

dotenv.config();

//Express
const app = express();
const port = process.env.PORT;

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

// app.use((req, res, next) => {
// 	res.status(404).send("404 No page found");
// });

app.listen(port, () => {
	console.log(`Express app http://localhost:${port}`);
});
