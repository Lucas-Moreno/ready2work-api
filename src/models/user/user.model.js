const pools = require("../../../db.js")

const getUser = async () => {
    const res = await pools.simpleQuery("SELECT * from user")
    return res
  }
  
  module.exports = {
    getUser
  }