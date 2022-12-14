const mongoose = require("mongoose")


const disSchema = new mongoose.Schema({
    disName:String,
    ps:[
        {
            psName:String,
            psId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'ps'
            }
        }
    ],
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
    }]
   
    
},
{
    timestamps:true
}
)

module.exports = mongoose.model('dis',disSchema);