const express = require('express')
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

//protect so that only logged in user can acces chat api's
router.route("/").post(protect, accessChat)
router.route("/").get(protect, fetchChat)

module.exports = router