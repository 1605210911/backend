const mongoose = require("mongoose")


const adminSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    status:{
        type:String
    },
    supList:[
        {
            supName:String,
            supId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'supervisor'
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
},
{
    timestamps:true
}
)

module.exports = mongoose.model('admin',adminSchema);