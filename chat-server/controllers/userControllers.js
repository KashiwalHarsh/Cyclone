//express-async-handler for handling errors automitically
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        res.status(400).json("Please Enter all the Fields");
        throw new Error("Please Enter all the Fields")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json("User Already Exists");
        throw new Error("User Already Exists")
    }

    const user = await User.create({ name, email, password, pic })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json("Failed to Create the user");
        throw new Error("Failed to Create the user")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else {
        res.status(401).json("Invalid Email or Password");
        throw new Error("Invalid Email or Password")
    }
})

// /api/user?search=harsh
const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } }
            ]
        }
        : {}

    // using ternary operator if keyword is not empty the $or:[] is put inside User.find(), else {} is put in User.find()
    // code after ↓ ternary exp.
    // User.find({
    //     $or: [
    //         { name: { $regex: req.query.search, $options: 'i' } },
    //         { email: { $regex: req.query.search, $options: 'i' } }
    //     ]
    // })

    const users = await User.find(keyword)
    res.send(users)
})

module.exports = { registerUser, authUser, allUser }