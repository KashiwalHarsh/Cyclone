const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cors = require("cors")
const { chats } = require('./dummy-data/data')
const connectDB = require('./config/db')


const app = express()
app.use(cors())

connectDB()

app.get("/", (req, res) => {
    res.send("Default route ")
})
app.get("/api/chats", (req, res) => {
    res.send(chats)
})
app.get("/api/chats/:id", (req, res) => {
    // console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id)
    res.send(singleChat)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})