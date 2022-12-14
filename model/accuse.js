const mongoose = require("mongoose")


const accuseSchema = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        String
    },
    act:{
        ActType:{
           type: String
        },
        dhara:{
            type:String
        }
    },
    relation : {
        name:{
            type:String
        },
        rType:{
            type:String
        }
        
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address'
    }
    
})

module.exports = mongoose.model('accuse',accuseSchema);