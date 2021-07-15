const pools = require("../../../db.js")

const getUser = async () => {
  const res = await pools.simpleQuery("SELECT * from user")
  return res
}

const createUserByFirebase = async (name, email, uid) => {
  const res = await db.simpleQuery("INSERT INTO user SET name=?, firebaseUid=?, email=?", [name, uid, email])
  return res
}

const getUserStatusModel = async (id) => {
  const res = await db.simpleQuery("SELECT id, name, email FROM user WHERE id = ?", [id])
  return res
}

const findByUID = async (uid) => {
  const res = await db.simpleQuery("SELECT id FROM user WHERE firebaseUid = ?", [uid])
  return res.length > 0 ? res : false
}


module.exports = {
  getUser,
  createUserByFirebase,
  getUserStatusModel,
  findByUID
}
