const express = require('express')
const { registerUser, authUser, allUser } = require("../controllers/userControllers")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

//Register user, Controller Chaining
//Before searching allUser it verifies authority by jwt using protect Middleware
router.route("/").post(registerUser).get(protect, allUser)

//login user, Without Chaining
router.post("/login", authUser)

module.exports = router