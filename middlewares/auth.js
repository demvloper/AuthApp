const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => {
    try {
        console.log("Cookie ", req.cookies.token);
        console.log("Body ", req.body.token);

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing",
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            return res.status(401).json({
                success: true,
                message: "Token is invalid",
            })
        }

        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students",
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: true,
            message: "User Role cannot be verified",
        })

    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin",
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: true,
            message: "User Role cannot be verified",
        })

    }
}