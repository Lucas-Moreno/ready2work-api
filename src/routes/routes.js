module.exports = (app) => {

  // Middleware
  const { verifyToken } = require("../middleware/firebaseMiddleware.js")

  // Controller
  const userController = require("../controllers/user/user.controller.js")
  const authentificationController = require("../controllers/authentification/authentification.js")
  const testController = require("../controllers/test/testController.js")
  const clientController = require("../../dbInflux.js")
  const reservationController = require("../controllers/reservation/reservation.controller.js")

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


  // Routes influx
  app.get("/api/room", clientController.getAllRoom)
  app.get("/api/room/luminosite", clientController.getLuminosite)
  app.get("/api/room/nbPers", clientController.getnbPers)
  app.get("/api/room/temperature", clientController.getTemperature)
  app.get("/api/room/decibel", clientController.getDecibel)
  app.get("/api/room/:id", clientController.getRoom)

  // Routes reservation
  app.post("/api/reservation/:id", reservationController.createReservation)
  app.get("/api/reservation", reservationController.getAllReservation)
}
