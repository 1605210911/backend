const mongoose = require("mongoose")


const villSchema = new mongoose.Schema({
    villName:{
        type:String
    },
    accuse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'accuse'
    }],
    creator:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'creator'
    }]
   
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model('vill',villSchema);