const express = require("express")
var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/user.model")
const AuthUser = express.Router()
const bcrypt = require('bcrypt');
AuthUser.use(express.json())
AuthUser.get("/",async (req,res)=>{
    try{
        const data =  await UserModel.find()
        res.send(data)
    }catch(err){
        res.send(err.massage)
    }
})
AuthUser.post("/register",(req,res)=>{
    const {email,password} = req.body
    bcrypt.hash(password, 3, function(err, hash) {
        const user = new UserModel({email:email,password:hash})
        user.save()
       res.send({"msg":"register sucessfull"})
    })
})

AuthUser.post("/login",async(req,res)=>{
    const {email,password} = req.body
    console.log(email,password)
    const user = await UserModel.find({email})
    if(user){
        bcrypt.compare(password,user[0].password, function(err, result) {
            console.log(user[0].password)
            result?res.status(200).send({"msg":"login sucessfull","token": jwt.sign({"UserID":user[0]._id}, 'shhhhh')}):res.status(400).send("Login Failed")
        });
    }
})

AuthUser.get("/move",(req,res)=>{
    const {token} = req.query
    console.log(token)
     jwt.verify(token, 'shhhhh', function(err, decoded) {
        decoded?res.status(200).send("User Details"):res.status(400).send("hero")
      });
    res.send("hero")
})
module.exports={
    AuthUser
}