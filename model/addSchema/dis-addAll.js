const mongoose = require("mongoose")


const disAddAllSchema = new mongoose.Schema({
    
            "disName":String,
            "disId":mongoose.Schema.Types.ObjectId,
            "ps":[
                {
                    "psName":String,
                    "psId":mongoose.Schema.Types.ObjectId,
                    "vill":[
                        {
                            "villName":String,
                            "villId":mongoose.Schema.Types.ObjectId
                        }
                    ]
                }
            ]
        
    
})

module.exports = mongoose.model('disAdd',disAddAllSchema);