//Express
import express from "express";
const app = express();
const port = 3000;

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

app.use((req, res, next) => {
	res.status(404).send("404 No page found");
});

app.listen(port, () => {
	console.log(`Express app http://localhost:${port}`);
});
