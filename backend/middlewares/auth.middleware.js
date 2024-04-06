const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.tokenKey, async (err, decoded) => {
            if (decoded) {
                req.body.userId = decoded.userId;
                req.body.userName = decoded.userName;
                next() ;
            } else {
                res.status(400).json({msg: "Invalid Token"});
            }
        });
    } catch(err) {
        res.status(500).json({"Internal Server Error": err});
    }
}

module.exports = { auth }