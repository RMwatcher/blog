import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts : posts });
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/blogpost", (req, res) => {
    res.render("blogpost.ejs", { posts : posts });
});

app.post("/submit", (req, res) => {
    const { title, author, content } = req.body;    
    console.log("Your post was submitted.");
    posts.push( { title : title, author : author, content : content });
    console.log(posts);
    res.render("index.ejs", { posts : posts });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});