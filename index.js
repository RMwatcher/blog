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

app.get("/blogpost/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    if (post) {
        res.render("blogpost.ejs", { post : post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.put("/update/:id", (req, res) => {
    // const postId = req.params.id;
    // const updateBody = req.body;

    // if (update.id !== parseInt(id)) {
    //     res.status(404).send("Post not found");
    // };
});


app.post("/submit", (req, res) => {
    const { title, author, content } = req.body;    
    console.log("Your post was submitted.");
    posts.push( { title : title, author : author, content : content });
    res.render("index.ejs", { posts : posts });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});