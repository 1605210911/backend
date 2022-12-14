const mongoose = require("mongoose")


const supervisorSchema = new mongoose.Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    fatherName:{
        type:String
    },
    password:{
        type:String
    },
    dis:{
        type:String
    },
    ps:{
        type:String
    },
    vill:{
        type:String
    },
    aadharNo:{
        type:String
    },
    creList:[
        {
            creName:String,
            supId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'creator'
            }
        }
    ],
    postList:[
        {
            postDetail:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'post'
            }
        }
    ]
    
})

module.exports = mongoose.model('supervisor',supervisorSchema);