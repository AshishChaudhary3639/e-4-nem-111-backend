const express=require("express")
const { connection } = require("./config/db")
const cors=require("cors")
const { signupRoute } = require("./Routes/SignupUser.route")
const { todoRoute } = require("./Routes/Todo.route")
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())

app.use("/", signupRoute)
app.use("/",todoRoute)

app.listen(process.env.PORT,async()=>{

    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log("Something wrong try agin")
    }
})