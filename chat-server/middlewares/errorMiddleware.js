const notFound = (req, res, next) => {
    const error = new Error(`404 : Not found - ${req.originalUrl}`)
    res.status(404)
    next(error);
};

//read about how to handle errors in nodejs
const errorHandler = (req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
};

module.exports = { notFound, errorHandler }