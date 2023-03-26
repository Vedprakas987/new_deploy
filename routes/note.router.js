const express = require("express")
const { notesModel } = require("../model/note.model")
const noteRouter = express.Router()
const jwt = require("jsonwebtoken")
noteRouter.use(express.json())
// noteRouter.get("/",async(req,res)=>{
//     const data = await notesModel.find()
//     res.send(data)
// })

noteRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"shhhhh")
    console.log("decodes",decoded)
    try{
        if(decoded){
            const notes=await notesModel.find({"userID":decoded.UserID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})
noteRouter.post("/", async(req,res)=>{
    try{
        const new_note = new notesModel(req.body)
        await new_note.save()    
        res.send({"msg":"new notes are posted"})
    }catch(err){
        res.send(err.massage)
    }
  
})
noteRouter.patch("/update/:noteID",async(req,res)=>{
    const payload= req.body
    const noteID=req.params.noteID
    console.log(req.params,noteID)
    const decoded=jwt.verify(token,"shhhhh")
    try{
   await notesModel.findOneAndUpdate({_id:noteID},payload)
   res.status(200).send("that note is updates")
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const token=req.headers.authorization
    const noteID=req.params.noteID
    const decoded=jwt.verify(token,"shhhhh")
    const uId = decoded.UserID
    const ele= await notesModel.findOne({_id:noteID})
    console.log("elements",ele)
    const userID = ele.userID
    console.log(uId,userID)
    try{
        if(uId==userID){
            console.log("hello i am checker")
    await notesModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":"this not is deleted"})
        }else{
            res.send({"msg":err.massage})  
        }
    }catch(err){
        res.send({"msg":err.massage})
    }
})
module.exports={
    noteRouter
}