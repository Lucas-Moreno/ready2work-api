const pools = require("../../../db.js")

const getUser = async (idUser) => {
  const res = await pools.simpleQuery("SELECT * from user where id=?", [idUser])
  return res
}

const createUserByFirebase = async (name, email, uid) => {
  console.log(name)
  console.log(email)
  console.log(uid)
  const res = await pools.simpleQuery("INSERT INTO user SET name=?, firebaseUid=?, email=?", [name, uid, email])
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
