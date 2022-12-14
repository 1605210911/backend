const mongoose = require("mongoose")


const yearSchema = new mongoose.Schema({
            year:Number,
            crimeList:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'address'
                }
            ]
        
    
   

})
module.exports = mongoose.model('year',yearSchema);