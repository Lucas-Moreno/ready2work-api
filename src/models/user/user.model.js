const pools = require("../../../db.js")

const getUser = async () => {
  const res = await pools.simpleQuery("SELECT * from user")
  return res
}

const createUserByFirebase = async (name, email, password) => {
  const res = await pools.simpleQuery("INSERT INTO user SET name=?, password=?, email=?", [name, password, email])
  return res
}

const getUserStatusModel = async (id) => {
  const res = await pools.simpleQuery("SELECT id, name, email FROM user WHERE id = ?", [id])
  return res
}

const findByUID = async (uid) => {
  const res = await pools.simpleQuery("SELECT id FROM user WHERE firebaseUid = ?", [uid])
  return res.length > 0 ? res : false
}


module.exports = {
  getUser,
  createUserByFirebase,
  getUserStatusModel,
  findByUID
}
