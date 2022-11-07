const jwt=require("jsonwebtoken")
const { SignupModel } = require("../Models/SignupUser.model")
require("dotenv").config()
const authentication=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.SECRET_KEY, async function(err, decoded) {
        
        if(err){
            res.send({"msg":"Please try login again"})
        }
        else{
            const email=decoded.email
            const user= await SignupModel.findOne({email})
            req.body.userId=user._id
            next()
        }

    });

}

module.exports={
    authentication
}