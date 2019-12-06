const express = require("express");
const comments = require("../db.js");

const router = express.Router({
  mergeParams: true
});

// Get all comments by PostId

router.get("/", (req, res) => {
  const id = req.params.id;
  comments
    .findPostComments(id)
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

router.get("/:commentsId", (req, res) => {
  comments
    .findCommentById(req.params.commentsId)
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

module.exports = router;
