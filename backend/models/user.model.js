const mongoose = require('mongoose');


//creating User schema
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    pass: String
},{
    versionKey: false
})



//creating User model
const UserModel = mongoose.model('users', userSchema);


//exporting User model
module.exports = {
    UserModel
}