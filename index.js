const express= require('express');
const app = express();
const jwt = require("jsonwebtoken");
const secrect="sumitpasss";
const bcrypt = require("bcrypt");
const mongo= require("mongoose");

app.use(express.json());

// filepath: /workspaces/Chohort3/todoapp/index.js
app.post("/signup", async function (req , res){ 
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    res.json({
        message: "user created"
    });
});
app.listen(3000);