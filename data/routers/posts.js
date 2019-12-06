// const express = require("express");
// const commentsRouter = require("./comments");
// const posts = require("../db.js");

// const router = express.Router();

// router.use("/api/posts");

// app.put("/api/users/:id", async (req, res) => {
//     try {
//        const userId = Number(req.params.id);
//        let user = await db.findById(userId);
//        if (!user) {
//           return res.status(404).json({ message: "The user with the specified ID does not exist." });
//        }
//        if (!req.body.name || !req.body.bio) {
//           return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
//        }
//        const result = await db.update(userId, req.body);
//        // console.log(`Num Files updated: ${result}`);

//        user = await db.findById(userId);
//        res.status(200).json(user);
//     } catch (err) {
//        console.err(err);
//        res.status(500).json({ errorMessage: "The user information could not be modified." });
//     }
//  });

// router.get("/", async (req, res) => {
//   try {
//     const result = await posts.find();
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json("Not found");
//   }
// });

// router.post("/", async (req, res) => {
//   const newPost = {
//     title: "",
//     contents: ""
//   };
//   try {
//     if (!res.body.title || !req.body.contents) {
//       return res.status(400).json({
//         errorMessage: "Please provide title and contents for the post."
//       });
//     }
//     const result = await posts.insert(newPost);
//     res.status(201).json(result);
//   } catch (err) {
//     res
//       .status(500)
//       .json({
//         error: "There was an error while saving the post to the database"
//       });
//   }
// });

// module.exports = router;
