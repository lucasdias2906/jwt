const express = require('express')
const router = express.Router()
const { postUser, login, refreshToken } = require("../api/user")
const controller = require("../controller/user")
const authUser = require("../auth/user_auth")

router.get("/", controller.get)
router.post("/", postUser)
router.post("/login", login)
router.post("/refresh", authUser.authorize, refreshToken)


module.exports = router