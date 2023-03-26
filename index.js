const express = require("express")
const { connection } = require("./connection/db")
const { Auth } = require("./middleware/authentication.middleware")
const { UserModel } = require("./model/user.model")
const { noteRouter } = require("./routes/note.router")
const { AuthUser } = require("./routes/user.router")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use("/users",AuthUser)
app.use(Auth)
app.use("/notes",noteRouter)
app.listen(4600,async()=>{
    try{
    await connection
    console.log("Server is running on PORT 4600")
    }catch(err){
        console.log(err.massage)
    }
})