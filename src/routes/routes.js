module.exports = (app) => {
  const userController = require("../controllers/user/user.controller.js")

  app.get("/", (req, res) => {
    res.send("Welcome to my api.")
  })

  app.get("/user", userController.getUser)
}
