const client = require("../../../dbInflux.js")

const test = () => {
    console.log(client)
    return "hello"
}

module.exports = {test}