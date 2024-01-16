const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cors = require("cors")
const { chats } = require('./dummy-data/data')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json()) //to accept json data

//Db connection - config
connectDB()

//Routes 
app.get("/", (req, res) => {
    res.send("Default route ")
})

app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})