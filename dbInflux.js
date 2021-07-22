const { response201WithData, response500WithMessage, response400WithMessage } = require("./src/helpers/expressRes.js")
const { InfluxDB } = require("@influxdata/influxdb-client")

// You can generate a Token from the "Tokens Tab" in the UI
const token = "HcbRoaYphnOrC2-gsjoC_Y7Rt9_fHugzWYVxcbX6aisiqzSGOO29BvxOxVC5oDl4-UEIoAHIKJjJdN1RfdkAqA=="
const org = "lucas.moreno@hetic.net"
const bucket = "Ready2work"

const client = new InfluxDB({ url: "https://eu-central-1-1.aws.cloud2.influxdata.com", token: token })

const queryApi = client.getQueryApi(org)

const getRoom = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "Temperature" or r["_measurement"] == "NbPers" or r["_measurement"] == "Luminosité" or r["_measurement"] == "Bruit")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "${req.params.id}")
    |> yield(name: "mean")
  `

  let mesureTable = []
  let obj = {}
  let noise = {}
  let temperature = {}
  let brightness = {}
  let nbPers = {}

  try {
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        mesureTable.push(o)
        for (const mesure of mesureTable) {
          if (mesure._measurement === "Bruit") {
            noise = {
              measurement: mesure._measurement,
              value: mesure._value,
            }
          }
          if (mesure._measurement === "Temperature") {
            temperature = {
              measurement: mesure._measurement,
              value: mesure._value,
            }
          }
          if (mesure._measurement === "Luminosité") {
            brightness = {
              measurement: mesure._measurement,
              value: mesure._value,
            }
          }
          if (mesure._measurement === "NbPers") {
            nbPers = {
              measurement: mesure._measurement,
              value: mesure._value,
            }
          }
        }
        obj = {
          room: req.params.id,
          noise,
          temperature,
          brightness,
          nbPers,
        }
      },
      error(error) {
        console.error(error)
      },
      complete() {
        var hello = Object.keys(obj).length
        if (hello > 0) {
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

const getAllRoom = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "Bruit" or r["_measurement"] == "Luminosité" or r["_measurement"] == "NbPers" or r["_measurement"] == "Temperature")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "A101" or r["nodeID"] == "A102" or r["nodeID"] == "A103" or r["nodeID"] == "A104" or r["nodeID"] == "A105" or r["nodeID"] == "A106" or r["nodeID"] == "A107" or r["nodeID"] == "A108" or r["nodeID"] == "A109" or r["nodeID"] == "A110" or r["nodeID"] == "B101" or r["nodeID"] == "B102" or r["nodeID"] == "B103" or r["nodeID"] == "B104" or r["nodeID"] == "B105" or r["nodeID"] == "B106" or r["nodeID"] == "B107")
    |> yield(name: "mean")
  `

  let table = []
  let obj = {}

  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      obj = {
        room: o.nodeID,
        measurement: o._measurement,
        value: o._value,
      }
      table.push(obj)
    },
    error(error) {
      console.error(error)
    },
    complete() {
      if (0 === 0) {
        return response201WithData(res, table)
      } else {
        return response400WithMessage(res, "You don't have room")
      }
    },
  })
}

const getLuminosite = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "Luminosité")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "A101" or r["nodeID"] == "A102" or r["nodeID"] == "A103" or r["nodeID"] == "A104" or r["nodeID"] == "A105" or r["nodeID"] == "A106" or r["nodeID"] == "A107" or r["nodeID"] == "A108" or r["nodeID"] == "A109" or r["nodeID"] == "A110" or r["nodeID"] == "B101" or r["nodeID"] == "B102" or r["nodeID"] == "B103" or r["nodeID"] == "B104" or r["nodeID"] == "B105" or r["nodeID"] == "B106" or r["nodeID"] == "B107")
    |> yield(name: "mean")
  `
  let table = []
  let obj = {}
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      obj = {
        room: o.nodeID,
        measurement: o._measurement,
        value: o._value,
      }
      table.push(obj)
    },
    error(error) {
      console.error(error)
    },
    complete() {
      if (0 === 0) {
        return response201WithData(res, table)
      } else {
        return response400WithMessage(res, "You don't have room")
      }
    },
  })
}

const getDecibel = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "Bruit")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "A101" or r["nodeID"] == "A102" or r["nodeID"] == "A103" or r["nodeID"] == "A104" or r["nodeID"] == "A105" or r["nodeID"] == "A106" or r["nodeID"] == "A107" or r["nodeID"] == "A108" or r["nodeID"] == "A109" or r["nodeID"] == "A110" or r["nodeID"] == "B101" or r["nodeID"] == "B102" or r["nodeID"] == "B103" or r["nodeID"] == "B104" or r["nodeID"] == "B105" or r["nodeID"] == "B106" or r["nodeID"] == "B107")
    |> yield(name: "mean")
  `
  let table = []
  let obj = {}
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      obj = {
        room: o.nodeID,
        measurement: o._measurement,
        value: o._value,
      }
      table.push(obj)
    },
    error(error) {
      console.error(error)
    },
    complete() {
      if (0 === 0) {
        return response201WithData(res, table)
      } else {
        return response400WithMessage(res, "You don't have room")
      }
    },
  })
}

const getTemperature = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "Temperature")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "A101" or r["nodeID"] == "A102" or r["nodeID"] == "A103" or r["nodeID"] == "A104" or r["nodeID"] == "A105" or r["nodeID"] == "A106" or r["nodeID"] == "A107" or r["nodeID"] == "A108" or r["nodeID"] == "A109" or r["nodeID"] == "A110" or r["nodeID"] == "B101" or r["nodeID"] == "B102" or r["nodeID"] == "B103" or r["nodeID"] == "B104" or r["nodeID"] == "B105" or r["nodeID"] == "B106" or r["nodeID"] == "B107")
    |> yield(name: "mean")
  `
  let table = []
  let obj = {}
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      obj = {
        room: o.nodeID,
        measurement: o._measurement,
        value: o._value,
      }
      table.push(obj)
    },
    error(error) {
      console.error(error)
    },
    complete() {
      if (0 === 0) {
        return response201WithData(res, table)
      } else {
        return response400WithMessage(res, "You don't have room")
      }
    },
  })
}

const getnbPers = async (req, res) => {
  const query = `
  from(bucket: "Ready2work")
    |> range(start: -1h)
    |> filter(fn: (r) => r["_measurement"] == "NbPers")
    |> filter(fn: (r) => r["_field"] == "data_value")
    |> filter(fn: (r) => r["nodeID"] == "A101" or r["nodeID"] == "A102" or r["nodeID"] == "A103" or r["nodeID"] == "A104" or r["nodeID"] == "A105" or r["nodeID"] == "A106" or r["nodeID"] == "A107" or r["nodeID"] == "A108" or r["nodeID"] == "A109" or r["nodeID"] == "A110" or r["nodeID"] == "B101" or r["nodeID"] == "B102" or r["nodeID"] == "B103" or r["nodeID"] == "B104" or r["nodeID"] == "B105" or r["nodeID"] == "B106" or r["nodeID"] == "B107")
    |> yield(name: "mean")
  `
  let table = []
  let obj = {}
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      obj = {
        room: o.nodeID,
        measurement: o._measurement,
        value: o._value,
      }
      table.push(obj)
    },
    error(error) {
      console.error(error)
    },
    complete() {
      if (0 === 0) {
        return response201WithData(res, table)
      } else {
        return response400WithMessage(res, "You don't have room")
      }
    },
  })
}

module.exports = { getRoom, getAllRoom, getLuminosite, getnbPers, getTemperature, getDecibel }
