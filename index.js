
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secrect="sumitpasss";
const bcrypt = require("bcrypt");
const mongo= require("mongoose");
mongo.connect("mongodb+srv://sumitpatil9370:ghosthock@cluster0.f6d07ui.mongodb.net/sumit")

const {userModel1,todoModel1}=require("./auth");
app.use(express.json());

app.post("/signup", async function (req , res){ 
    
    const { name , email, pass}=req.body;
    const haspass=await bcrypt.hash(pass,2);
    const process = await userModel1.create({name: name,email:email, pass: haspass});
    if (process){
        res.status(201).json({
        message: `you are now logged in as ${name}`
    })
    }else{
        res.status(301).json({
            message: "enter wrong credincionls"
        })
    }
});
app.post("/login", async function (req , res) {
    const { name , email, pass}=req.body;
    const user=await userModel1.findOne({email:email});
    if(user){
    const hasveryfy=await bcrypt.compare(pass,user.pass);
    if (hasveryfy){
        const toke=jwt.sign({
            Userid:user._id.toString()},secrect);
            console.log(toke);
            res.status(201).json({
                message:"you are now logged in as  "+name,
                token:toke          
             });
    }
    else{
        res.status(401).json({
            message: "enter wrong password"
        })
    }

        
      }
   else{
        res.status(404).json({
            message: "user not found"});
    }
    
    

    
})
app.listen(3000);