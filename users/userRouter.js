const express = require("express")

const Data = require("./userDb")

const Posts = require("../posts/postDb")

const router = express.Router()

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.status(200).json(req.users)
})

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  res.status(200).json(req.userposts)
})

router.get("/", (req, res) => {
  // do your magic!
  Data.get()
    .then(user => res.status(200).json(user))
    .catch(err => {
      res.status(500).json({ error: err })
    })
})

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
})

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params

  Data.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ error: "Error" }))
})

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Data.remove(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: "Error" }))
})

// router.put("/:id", validateUserId, validateUser, (req, res) => {
//   // do your magic!
//   const { id } = req.params
//   const body = req.body
//   Data.update(id, body)
//     .then(post =>
//       !post ? console.log("hello") : res.status(200).json(req.users)
//     )
//     .catch(err => console.log(err, "Hello") & res.status(500).json(err.message))
// })

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const changes = req.body
  if (!changes.name) {
    res.status(400).json({ message: "Need to update the user name." })
  } else {
    Data.update(id, changes)
      .then(update => {
        res.status(200).json(update)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ error: "Failed to update User name" })
      })
  }
})

// router.put("/:id", validatePostId, (req, res) => {
//   // do your magic!
//   const { id } = req.params
//   const changes = req.body
//   if (!changes.text) {
//     res.status(400).json({ message: "Need to update the posts text." })
//   } else {
//     Posts.update(id, changes)
//       .then(update => {
//         res.status(200).json(update)
//       })
//       .catch(error => {
//         console.log(error)
//         res.status(500).json({ error: "Failed to update Post." })
//       })
//   }
// })

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Data.getById(id)
    .then(users =>
      users
        ? (req.user = users) & next()
        : res.status(401).json({ message: "Not a valid ID" })
    )
    .catch(err => res.status(500).json({ error: "invalid user id" }))
}

function validateUser(req, res, next) {
  // do your magic!
  Data.insert(user)
    .then(user =>
      !user
        ? res.status(400).json({ error: "no user" })
        : !user.name
        ? res.status(400).json({ error: "missing name" })
        : (req.users = users) & next()
    )
    .catch(err => res.status(500).json(err.message))
}

// req.body && req.body.name
// ? next()
// : !req.body.name
// ? res.status(500).json({ error: "needs to have name" })
// : res.status(500).json({ Error: "needs to have body" });

// function validatePost(req, res, next) {
//   // do your magic!
//   const { id } = req.params
//   const user = { ...req.body, user_id: id }

//   Posts.insert(user)
//     .then(users =>
//       !users
//         ? res.status(400).json({ error: "no user" })
//         : !user.text
//         ? res.status(400).json({ error: "missing name" })
//         : (req.userpost = users) & next()
//     )
//     .catch(err => res.status(500).json(err.message))
// }
function validatePost(req, res, next) {
  // do your magic!
  const { id } = req.params
  const user = { ...req.body, user_id: id }
  Posts.insert(user)
    .then(users =>
      !users & console.log(users)
        ? res.status(400).json({ error: "no user" })
        : !user.text
        ? res.status(400).json({ message: "missing post data" })
        : (req.userpost = users) & console.log(users, "TEST") & next()
    )
    .catch(err => res.status(500).json({ error: "error" }))
}

module.exports = router
