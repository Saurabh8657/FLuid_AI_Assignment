const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');
const { BlacklistedTokenModel } = require('../model/blacklist.token.model');
require('dotenv').config();

const userRouter = express.Router() ;


//---- User Routes  ----//

//---- register ----//
userRouter.post("/register", async (req, res) => {
    const { userName, email, pass } = req.body ;
    try {
        bcrypt.hash(pass, 5,async (err, hash) => {
            if (err) {
                res.status(400).json({"Password Hashing Failed": err});
            } else {
                const user = {
                    userName,
                    email,
                    pass: hash,
                }
                const userToAdd = new UserModel(user);
                await userToAdd.save();
                res.status(200).json({"Registration Successful": "User Added to Database", user: userToAdd});
            }
        });
    } catch (err) {
        res.status(500).json({"Internal Server Error": err});
    }
})

//---- login ----//
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body ;
    try {
        const userTryingToLogin = await UserModel.findOne({email});
        bcrypt.compare(pass, userTryingToLogin.pass, async (err, result) => {
            if (err) {
                res.status(400).json({"Password DeHashing Failed": err});
            } else {
                const token = jwt.sign({ userId: userTryingToLogin._id, userName: userTryingToLogin.userName }, process.env.tokenKey, { expiresIn: '1d' });
                res.status(200).json({Message:"Login Successful", user: userTryingToLogin, token: token});
            }
        });
    } catch (err) {
        res.status(500).json({"Internal Server Error": err});
    }
})

// --- logout user --- //
userRouter.post('/logout', async (req, res) => {
    const token = req.headers.authorization;
    try {
      const tokenToBeBlacklisted = new BlacklistedTokenModel({ token });
      await tokenToBeBlacklisted.save();
      res.status(200).json({ msg: 'Logged out successfully' });
    } catch (error) {
      res.status(400).json(error);
    }
});

module.exports = {
    userRouter,
}
