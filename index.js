const express = require("express");
const postsRouter = require("./data/routers/posts");

const server = express();
const port = 5000;
const host = "127.0.0.1";

server.use(express.json());
server.use("/api/posts", postsRouter);

// * Home

server.get("/", (req, res) => {
  return res.send({ message: "You made it!" });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
