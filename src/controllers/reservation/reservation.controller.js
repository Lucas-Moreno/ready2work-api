const RerservationModel = require("../../models/reservation/reservation.model.js")
const { response201WithData, response201WithMessage, response500WithMessage } = require("../../helpers/expressRes")

const createReservation = async (req, res) => {
  let idUser = req.user[1]
  let idSalle = req.params.id
  let date = req.body.date
  let time = req.body.time

  try {
    const data = await RerservationModel.createReservation(idUser, idSalle, date, time)
    console.log(data)
    return response201WithMessage(res, "Reservation created")
  } catch (e) {
    return response500WithMessage(res, "Oups failed ! T_T")
  }
}

const getAllReservation = async (req, res) => {
    try {
        const data = await RerservationModel.getAllReservation()
        return response201WithData(res, data)
      } catch (e) {
        return response500WithMessage(res, "Oups failed ! T_T")
      }
}

module.exports = { createReservation, getAllReservation }
