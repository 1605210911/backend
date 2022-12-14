const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'creator'
    },

    accuse:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'accuse'
    }
    ],
    content:{
        type:String
    }
    
})

module.exports = mongoose.model('post',postSchema);