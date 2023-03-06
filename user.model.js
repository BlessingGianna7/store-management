const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})
userSchema.methods.generateToken = function(){
    return jwt.sign(
        {id: this._id},
        process.env.JWT
    )
}

const User = mongoose.model('users',userSchema)

exports.User = User
