const express= require("express")
const mongoose = require("mongoose")
const _URL = "mongodb://localhost:27017/project";
const Url = "mongodb+srv://vivek:deepak@cluster0.i9r5ooo.mongodb.net/project?retryWrites=true&w=majority"
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
    mongoose.connect(Url,
        // { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        ()=>{
        console.log("Connected to database")
    })
})