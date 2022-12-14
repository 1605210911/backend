const { strict } = require("assert");
const mongoose = require("mongoose");
const { type } = require("os");


const psSchema = new mongoose.Schema({
    psName:String,
    vill:[
        {
            villName:String,
            villId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'vill'
            }
        }
],
    accuse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'accuse'
    }],
    creator:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'creator'
    }],
    crime:{
        crimeType:String |"ipc",
        detail:[
            {
                year:Number,
                crimeNo:String
            }
        ]

    }
   
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model('ps',psSchema);