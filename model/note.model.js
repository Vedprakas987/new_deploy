const mongoose = require("mongoose")
const userSchema = {
    Title:String,
    Description:String,
    userID:String
}


const notesModel = mongoose.model("page",userSchema)
module.exports={
    notesModel
}