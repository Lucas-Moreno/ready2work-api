const influx = require("../../../dbInflux.js")
const os = require("os")

const test = () => {

  influx
    .writePoints([
      {
        measurement: "response_times",
        tags: { host: os.hostname() },
        fields: { path: 2, duration: 1 },
      },
    ])
    .then(() =>{
       res.json("hello")
    })
    .catch((err) =>{
        console.log("error")
        res.status(500).send(err.stack)
    })
    // .then(() => {
    //   return influx
    //     .query(
    //       `
    //     select * from response_times
    //     where host = ${influx.escape.stringLit(os.hostname())}
    //     order by time desc
    //     limit 10
    //   `
    //     )
    //     .then((result) => {
    //       res.json(result)
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err.stack)
    //     })
    // })
    // .catch((err) => {
    //   res.status(500).send(err.stack)
    // })
}

module.exports = { test }
