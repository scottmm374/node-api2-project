const express = require("express");
const posts = require("../db.js");
const commentsRouter = require("./comments");

const router = express.Router();
router.use("/:id/comments", commentsRouter);
// const router = express.Router({
//   mergeParams: true
// });

// * Get all posts

router.get("/", (req, res) => {
  posts
    .find()
    .then(data => {
      return res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// * Get by id

router.get("/:id", (req, res) => {
  const id = req.params.id;
  posts
    .findById(id)
    .then(data => {
      console.log("get by id", data);
      if (!data) {
        return res
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

// * Create POST

router.post("/", (req, res) => {
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

// * Delete Post

router.delete("/:id", (req, res) => {
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

// * Update (Put) post

router.put("/:id", (req, res) => {
  const updatePost = {
    title: req.body.title,
    contents: req.body.contents
  };
  const id = req.params.id;

  posts.findById(id).then(data => {
    if (!data) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }

    if (!req.body.title || !req.body.contents) {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }

    posts
      .update(id, updatePost)
      .then(data => {
        res.status(200).send(updatePost);
      })
      .catch(error => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  });
});

module.exports = router;
