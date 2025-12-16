import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let userName = "";
let subject = "";
let content = "";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/blogpost", (req, res) => {
    res.render("blogpost.ejs", {
        name : userName,
        newSubject : subject,
        newContent : content
    });
});

app.post("/submit", (req, res) => {
    userName = req.body["uName"];
    subject = req.body["subject"];
    content = req.body["content"];
    
    console.log("Your post was submitted.");
    res.render("index.ejs", {
        name : userName,
        newSubject : subject
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});