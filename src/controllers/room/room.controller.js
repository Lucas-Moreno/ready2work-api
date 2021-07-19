const RoomModel = require("../../models/room/room.model.js")

const { response201WithData, response500WithMessage } = require("../../helpers/expressRes")

const getAllRoom = async (req, res) => {
  try {
    const data = await RoomModel.getAllRoom()
    return response201WithData(res, data)
  } catch (e) {
    return response500WithMessage(res, "Oups failed ! T_T")
  }
}

const getRoom = async (req, res) => {
  const name = req.params.id
  try {
    const data = await RoomModel.getRoom(name)
    return response201WithData(res, data)
  } catch (e) {
    console.log(e)
    return response500WithMessage(res, "Oups failed ! T_T")
  }
}

module.exports = {
  getAllRoom,
  getRoom,
}
