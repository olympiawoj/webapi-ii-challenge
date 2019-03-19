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
router.get("/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { id } = req.params;
  if (id) {
    db.findById(id)
      .then(post => res.status(200).json(post))
      .catch(error =>
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." })
      );
  } else {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
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

module.exports = router;

// A Blog Post in the database has the following structure:

// {
//   title: "The post title", // String, required
//   contents: "The post contents", // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }
