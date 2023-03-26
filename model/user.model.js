const mongoose = require("mongoose")
const userSchema = {
    email:String,
    password:String
}


const UserModel = mongoose.model("Writers",userSchema)
module.exports={
    UserModel
}