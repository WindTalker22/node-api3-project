// Import modules
const express = require("express")
const helmet = require("helmet")

const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()

// global middleware
server.use(express.json()) // built-in middleware

server.use(helmet()) // third-party  middleware

server.use("/api/users", logger, userRouter)
server.use("/api/posts", logger, postRouter)

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.url}`
  )

  next()
}

module.exports = server
