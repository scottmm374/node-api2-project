const express = require("express");
const posts = require("./data/db.js");

const server = express();

server.use(express.json());
// * Home

server.get("/", (req, res) => {
  res.send({ message: "You made it!" });
});

// * Get posts

server.get("/api/posts", (req, res) => {
  posts
    .find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// * Create POST

server.post("/api/posts", (req, res) => {
  const newPost = {
    title: req.body.title,
    contents: req.body.contents
  };

  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  posts
    .insert(newPost)
    .then(data => {
      console.log(data, "data");
      if (req.body.title && req.body.contents) {
        return res.status(201).send(newPost);
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the post to the database"
      });
    });
});

// * Get post by ID

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  posts
    .findById(id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// * Delete Post

server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  posts.findById(id).then(data => {
    console.log(data);
    if (!data) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });
  posts
    .remove(id)
    .then(data => {
      if (data) {
        res.status(200).json("Post Deleted");
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
