module.exports = (app) => {
  // Middleware
  const { verifyToken } = require("../middleware/firebaseMiddleware.js")

  // Controller
  const userController = require("../controllers/user/user.controller.js")
  const authentificationController = require("../controllers/authentification/authentification.js")

  // Welcome API
  app.get("/", (req, res) => {
    res.send("Welcome to my api.")
  })

  // API VERIFY REQUETE
  /* checks if the API is well secured by a bearer Token */
  app.use("/api/", verifyToken)

  // Routes auth
  app.post("/auth/user/validate", authentificationController.validateUser)
  app.post("/auth/user/register", authentificationController.register)
  app.post("/auth/user/login", authentificationController.login)

  // Routes user
  app.get("/user", userController.getUser)
}
