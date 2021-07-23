const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const process = require("process")

const app = express()

var corsOptions = {
  origin: "http://localhost:80",
  origin: "http://localhost:3000",
  origin: "https://ready-2-work.netlify.app/"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const firebase = require("firebase")
const admin = require("firebase-admin")

const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

// TODO: Replace the following with your app"s Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

require("./src/routes/routes.js")(app)

// set port, listen for requestsxs
const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Server is running on port ${PORT}.`)
})

module.exports = app
