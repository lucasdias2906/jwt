require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {errors} = require("celebrate")
const cors = require("cors")

const usersRoutes = require("./src/routes/user")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

app.use("/",usersRoutes)

app.use(errors())

module.exports = app