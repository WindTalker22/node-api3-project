const express = require("express")

const router = express.Router()

const Posts = require("./postDb")

router.get("/", (req, res) => {
  // do your magic!
})

router.get("/:id", (req, res) => {
  // do your magic!
})

router.delete("/:id", (req, res) => {
  // do your magic!
})

router.put("/:id", (req, res) => {
  // do your magic!
})

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params
  console.log("id", id)
  Posts.getById(id)
    .then(post => {
      if (post) {
        req.posts = post
        next()
      } else {
        res.status(400).json({ error: "Invalid" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: "Server error validating post ID" })
    })
}

module.exports = router
