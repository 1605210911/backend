const express= require("express")
const mongoose = require("mongoose")
const _URL = "mongodb://localhost:27017/project";
const bodyParser = require("body-parser")
const router = require("./router/route")
const cors = require("cors")

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("",(req,res,next)=>{
    res.send("get request at root");
    console.log("get request at root");
})

app.use(router);


app.listen(2000,()=>{
    console.log("Listing port 2000 ")
    mongoose.connect(_URL,()=>{
        console.log("Connected to database")
    })
})