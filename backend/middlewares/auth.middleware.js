const jwt = require('jsonwebtoken');
// const { UserModel } = require('../models/user.model');
require('dotenv').config();


//auth middleware
const auth = (req,res,next) => {
    const token = req.headers.authorization;
    // console.log(token);
    try{
        jwt.verify(token, process.env.tokenKey, async (err, decoded) => {
            if(decoded){
                const { userId, userName } = decoded;
                // console.log(decoded);
                // const user = await UserModel.findOne({_id: userId});
                req.body.userId = userId;
                req.body.userName = userName;
                next();
            } else {
                res.status(400).json({msg: "Login first!"})
            }
        })
    }
    catch(err){
        res.status(500).json({msg: 'Error from Auth-Middleware', err})
    }
}


//exporting auth
module.exports = {
    auth
}