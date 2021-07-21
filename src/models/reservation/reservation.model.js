const pools = require("../../../db.js")

const createReservation = async (idUser, idSalle, date, time) => {
  const res = await pools.simpleQuery("INSERT INTO reservation (idUser, idSalle, date, time) values(?,?,?,?)", [idUser, idSalle, date, time])
  return res
}

const getAllReservation = async () => {
    const res = await pools.simpleQuery("SELECT * from reservation")
    return res
  }

module.exports = {
  createReservation,
  getAllReservation
}