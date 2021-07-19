const influx = require("influx")

const client = new influx.InfluxDB({
    database:"Ready2work",
    host:"https://eu-central-1-1.aws.cloud2.influxdata.com",
    port:1883,
    username:"GROUP13",
    password:"74156626",
})

module.exports = client 