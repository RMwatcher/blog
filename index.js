import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const userName = "";
let subject = "";
let content = "";

function createPost (req, res, next) {
    userName = req.body["uName"];
    subject = req.body["subject"];
    content = req.body["content"];
    next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(createPost);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/submit", (req, res) => {
    console.log("Your post was submitted.")
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});