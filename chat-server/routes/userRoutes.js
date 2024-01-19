const express = require('express')
const { registerUser, authUser, allUser } = require("../controllers/userControllers")

const router = express.Router()

//Register user, Controller Chaining
router.route("/").post(registerUser).get(allUser)

//login user, Without Chaining
router.post("/login", authUser)

module.exports = router