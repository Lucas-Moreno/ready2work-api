const { response201WithData, response500WithMessage, response400WithMessage } = require("./src/helpers/expressRes.js")

const getAllRoom = async (req, res) => {
  const { InfluxDB } = require("@influxdata/influxdb-client")

  // You can generate a Token from the "Tokens Tab" in the UI
  const token = "HcbRoaYphnOrC2-gsjoC_Y7Rt9_fHugzWYVxcbX6aisiqzSGOO29BvxOxVC5oDl4-UEIoAHIKJjJdN1RfdkAqA=="
  const org = "lucas.moreno@hetic.net"
  const bucket = "Ready2work"

  const client = new InfluxDB({ url: "https://eu-central-1-1.aws.cloud2.influxdata.com", token: token })

  const queryApi = client.getQueryApi(org)

  const query = `
        from(bucket: "Ready2work")
            |> range(start: -3h)
            |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
            |> filter(fn: (r) => r["_field"] == "data_value")
            |> group(columns: ["topic"])
            |> yield(name: "mean")
    `

  let obj = {}

  try {
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        let room = req.params.id

        switch (true) {
          case o.topic.includes("A101") && room === "A101":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A102") && room === "A102":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A103") && room === "A103":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A104") && room === "A104":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A105") && room === "A105":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A106") && room === "A106":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A107") && room === "A107":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A108") && room === "A108":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A109") && room === "A109":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("A110") && room === "A110":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B101") && room === "B101":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B102") && room === "B102":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B103") && room === "B103":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B104") && room === "B104":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B105") && room === "B105":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B106") && room === "B106":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
          case o.topic.includes("B107") && room === "B107":
            obj = {
              room: req.params.id,
              measurement: o._measurement,
              temperature: o._value,
            }
            break
        }
      },
      error(error) {
        console.error(error)
      },
      complete() {
        const objectLength = Object.keys(obj).length
        console.log(objectLength)
        if (objectLength > 0) {
          return response201WithData(res, obj)
        } else {
          return response400WithMessage(res, "this room doesn't exist")
        }
      },
    })
  } catch (e) {
    return response500WithMessage(res, "Oups failed ! T_T")
  }
}

module.exports = { getAllRoom }
