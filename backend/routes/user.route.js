const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
require('dotenv').config();


//router middleware
const userRouter = express.Router();


//user route message
userRouter.get("/", (req, res) => {
    res.status(200).json({msg: "Welcome to the user route"})
})


//register route
userRouter.post("/register", async (req, res) => {
    const { userName, email, pass } = req.body ;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({msg: "Password Hashing Failed", err});
            } else {
                const newUser = new UserModel({
                    userName,
                    email,
                    pass: hash
                });
                await newUser.save();
                res.status(200).json({msg: "Registration Successful", newUser});
            }
        });

    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



// login route
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body ;
    try {
        const userTryingToLogin = await UserModel.findOne({ email });
        bcrypt.compare(pass, userTryingToLogin.pass, async (err, result) => {
            if (err) {
                res.status(400).json({msg: "Password De-hashing Failed", err});
            } else {
                const token = jwt.sign({ userId: userTryingToLogin._id, userName: userTryingToLogin.userName }, process.env.tokenKey, { expiresIn: '1d' });
                res.status(200).json({msg:"Login Successful", user: userTryingToLogin, token: token});
            }
        });
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error", err});
    }
})



// logout route
userRouter.get('/logout', async (req, res) => {
    const token = req.headers.authorization;
    try {
      const tokenToBeBlacklisted = new BlacklistedTokenModel({ token });
      await tokenToBeBlacklisted.save();
      res.status(200).json({ msg: 'Logged out successfully' });
    } catch (err) {
      res.status(500).json({msg: 'Internal Server Error', err});
    }
});



//exporting router module
module.exports = {
    userRouter,
}