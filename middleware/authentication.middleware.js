var jwt = require('jsonwebtoken');
const Auth=(req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    if(token){
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded){
            console.log(decoded)
            req.body.userID = decoded.UserID||1
            console.log(req.body)
           next() 
        }else{
            res.send("Login Required")
        }

}else{
    res.send("Login Requires")
}

}
module.exports={
    Auth
}