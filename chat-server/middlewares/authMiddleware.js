const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SEC)

            //find the loggedin user with ID after verifying his JWT token 
            //and store user's data without the password in req.user

            req.user = await User.findById(decoded.id).select("-password")
            // console.log("req.user " + req.user)
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed")
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token")
    }

})

module.exports = { protect }