const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({
    state:{
        type:String
    },
    dis:{
        type:String
    },
    ps:{
        type:String
    },
    halka:{
        type:String
    },
    vill:{
        type:String
    },
    
})

module.exports = mongoose.model('address',addressSchema);