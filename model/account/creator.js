const mongoose = require("mongoose")


const creatorSchema = new mongoose.Schema({
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
    aadharNo:{
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
    status:{
        type:Boolean
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ],
    
})

module.exports = mongoose.model('creator',creatorSchema);