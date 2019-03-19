//This file is in charge of confuring the server/adding routes

//Step 1- Import or require express
const express = require("express");

//Step 8- Create postsRouter to route everything relating to Posts
const postsRouter = require("./posts/posts-router.js");

//Step 2- Create an instance of a server powered by an express application
const server = express();

//Step 4- Configure root endpoint

server.get("/", (req, res) => {
  res.send("This is a test 123");
});

//Step 5- Export & Import into index.js
module.exports = server;
