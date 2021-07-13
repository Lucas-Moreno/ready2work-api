const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

require("dotenv").config()
const process = require("process")

const app = express()

var corsOptions = {
  origin: "http://localhost:80",
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

require("./src/routes/routes.js")(app)

// set port, listen for requestsxs
const PORT = process.env.PORT || 3000
app.listen(PORT, err => {
    if(err) throw err;
  console.log(`Server is running on port ${PORT}.`)
})

module.exports = app
