//Step 10- Inside posts-router.js,bring in express
const express = require("express");
//Step 11- Import our database
const db = require("../db.js");
//Step 12- Bring in express router to create new router
const router = express.Router();

//handlers
//GET all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

//GET post by id
//async await stops code, and if throws an error anywhere it goes to catch - you can throw your own error anywhere u want

router.get("/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;

  try {
    const post = await db.findById(id);
    //if (post) would return a blank array so returning truthy
    if (post.length) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

//POST
router.post("/", (req, res) => {
  const postInfo = req.body;
  //   console.log("Posts Info", postInfo);

  if (postInfo.title && postInfo.contents) {
    db.insert(postInfo)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  } else {
    res.status(404).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

//DELETE by id

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      //aka if something has been removed
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res.status(404).json({ message: "The post could not be found" });
    }
  } catch (error) {
    console.log(error); //log error to db
    res.status(500).json({ message: "Error removing the hub" });
  }
});

//PUT by id- updates the post w/ the specified id using data from the request body. Returns the modified document, NOT the original

router.put("/:id", async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const post = await db.update(req.params.id, req.body);
      if (post.length) {
        res.status(200).json(post);
      } else {
        res.status(204).json({ message: "The post could not be found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub"
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

module.exports = router;

// A Blog Post in the database has the following structure:

// {
//   title: "The post title", // String, required
//   contents: "The post contents", // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }
