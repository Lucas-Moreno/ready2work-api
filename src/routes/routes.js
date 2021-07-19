module.exports = (app) => {
  // Middleware
  const { verifyToken } = require("../middleware/firebaseMiddleware.js")

  // Controller
  const userController = require("../controllers/user/user.controller.js")
  const authentificationController = require("../controllers/authentification/authentification.js")
  const testController = require("../controllers/test/testController.js")
  const roomController = require("../controllers/room/room.controller.js")

  // Welcome API
  app.get("/", (req, res) => {
    res.send("Welcome to my api.")
  })
  app.get("/test", testController.test)

  // API VERIFY REQUETE
  /* checks if the API is well secured by a bearer Token */
  app.use("/api/", verifyToken)

  // Routes auth
  app.post("/auth/user/validate", authentificationController.validateUser)
  app.post("/auth/user/register", authentificationController.register)
  app.post("/auth/user/login", authentificationController.login)

  // Routes user
  app.get("/api/user", userController.getUser)

  // Routes room
  app.get("/api/room", roomController.getAllRoom)
  app.get("/api/room/:id", roomController.getRoom)
}
