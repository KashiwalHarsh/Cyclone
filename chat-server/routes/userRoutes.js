const express = require('express')
const { registerUser, authUser } = require("../controllers/userControllers")

const router = express.Router()

//Register user, Controller Chaining
router.route("/").post(registerUser)

//login user, Without Chaining
router.get("/login", authUser)

module.exports = router