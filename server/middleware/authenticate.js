const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req,res,next) => {
    try {
        const token = req.cookies.eccomerce;

        const verifyToken = jwt.verify(token, secretKey);
        console.log("Verify Token ", verifyToken)

        const rootUser = await USER.findOne({_id:verifyToken._id, "token.token":token});
        console.log("Root User ", rootUser)

        if(!rootUser){throw new Error ("Error user not found")};

        req.token=token
        req.rootUser=rootUser
        req.userID = rootUser._id
        next();
    } catch (error) {
        res.status(401).send("Unauthorise: Error, No token provided");
        console.log(error)
    }
}

module.exports = authenticate;