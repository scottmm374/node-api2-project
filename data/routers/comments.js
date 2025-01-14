const express = require("express");
const db = require("../db.js");

const router = express.Router({
  mergeParams: true
});

// Get all comments by PostId

router.get("/comments", (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(data => {
      console.log("get by id", data);
      if (data.length <= 0) {
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
        .json({ error: "The comments information could not be retrieved." });
    });
});

// Get Comment by ID

router.get("/comments/:commentsId", (req, res) => {
  db.findCommentById(req.params.commentsId)
    .then(data => {
      console.log("get by id", data);
      if (data.length <= 0) {
        return res.status(404).json({
          message: "The comment with the specified ID does not exist."
        });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

// Post comment to specific Post ID
router.post("/comments", (req, res) => {
  const id = req.params.id;
  console.log(id, "Post id");
  const newComment = {
    text: req.body.text,
    post_id: req.params.id
  };

  if (!req.body.text) {
    return res
      .status(400)
      .json({ message: "Please provide text for the comment." });
  }

  db.findById(id).then(data => {
    console.log("data findById", data);
    if (!data) {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  });

  db.insertComment(newComment)
    .then(data => {
      console.log("data", data);
      res.status(201).send(newComment);
    })

    .catch(error => {
      console.log(error, "err");
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

module.exports = router;
