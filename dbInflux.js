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
        if (o.topic.includes("A102") && room === "A102") {
          let name = "A102"
          obj = {
            room: name,
            measurement: o._measurement,
            value: o._value,
          }
        } else if (o.topic.includes("A103") && room === "A103") {
          let name = "A103"
          obj = {
            room: name,
            measurement: o._measurement,
            value: o._value,
          }
        } 
      },
      error(error) {
        console.error(error)
      },
      complete() {
        const objectLength = Object.keys(obj).length
        if(objectLength > 0){
            return response201WithData(res, obj)
        }else{
            return response400WithMessage(res, "this room doesn't exist")
        }
      },
    })
  } catch (e) {
    return response500WithMessage(res, "Oups failed ! T_T")
  }
}

module.exports = { getAllRoom }
