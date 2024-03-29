const express = require('express')
const { accessChat, fetchChat, createGroupChat, renameGroup, addToChat, removeFromChat } = require("../controllers/chatControllers")
const { protect } = require("../middlewares/authMiddleware")

const router = express.Router()

//protect so that only logged in user can acces chat api's

//accessChat is route for chat creation
router.route("/").post(protect, accessChat)
router.route("/").get(protect, fetchChat)
router.route("/group").post(protect, createGroupChat)
router.route("/rename").put(protect, renameGroup)
router.route("/groupadd").put(protect, addToChat)
router.route("/groupremove").put(protect, removeFromChat)


module.exports = router