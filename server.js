const mongoose = require("mongoose");
const User = require("./models/User");
const express = require("express");
const router = express.Router();


mongoose.connect("mongodb://localhost:27017/checkpoint", {
  useNewUrlParse: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("database connection has been established !");
});


const app = express();

const PORT = process.env.PORT || 3001

var http = require('http').Server(app);


http.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
  })

router.get('/getAllUsers',(res,req)=>{
    User.find({})
    .then((users)=>res.json(users))
    .catch((err)=>res.json(err))
})

router.post('/createNewUser',(req,res)=>{
    User.create(req.body)
    .then((res)=>res.json({msg:'user created'}))
    .catch((err)=>res.json(err))
})

router.put('/updateUser',(req,res)=>{
    User.findByIdAndUpdate(req.body.userId,req.body.newUser)
    .then((res)=>res.json({msg:'user updated'}))
    .catch((err)=>res.json(err))
})

router.delete('/deleteUser',(req,res)=>{
    User.findByIdAndDelete(req.body.userId)
    .then((res)=>res.json({msg:'deleted'}))
    .catch((err)=>res.json(err))
})
