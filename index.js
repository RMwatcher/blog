import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
        res.render("blogpost.ejs", { post : post, posts : posts, postId : postId });
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/edit/:id", (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const post = posts[postId];

    console.log("Post has been updated");
    if (post) {
        res.render("edit.ejs", { post : post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.put("/update/:id", (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const title = req.body["title"];
    const author = req.body["author"];
    const content  = req.body["content "];
    console.log("Post has been updated");
    if (postId >= 0 && postId < posts.length) {
        posts[postId] = { title, author, content };
        res.status(200).json({ 
            message: "Post updated successfully", 
            post: posts[postId] 
        });
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.delete("/blogpost/:id", (req, res) => {
    const postId = Number.parseInt(req.params.id);
    console.log("Post has been deleted");
    if (postId >= 0 && postId < posts.length) {
        posts.splice(postId, 1);
        res.status(200).json({ message: "Post deleted successfully" });
    } else {
        res.status(404).json({ error: "Post not found" });
    }
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