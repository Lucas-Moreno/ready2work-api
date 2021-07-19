const pools = require("../../../db.js")

const getAllRoom = async () => {
  const res = await pools.simpleQuery("SELECT * from room")
  return res
}

const getRoom = async (name) => {
    const res = await pools.simpleQuery("SELECT * from room where name=?",[name])
    return res
  }

module.exports = {
  getAllRoom,
  getRoom
}
