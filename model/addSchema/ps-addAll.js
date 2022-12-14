const mongoose = require("mongoose")


const psAddAllSchema = new mongoose.Schema({

                    "psName":String,
                    "psId":mongoose.Schema.Types.ObjectId,
                    "vill":[
                        {
                            "villName":String,
                            "villId":mongoose.Schema.Types.ObjectId
                        }
                    ]
                
            
        
    
})

module.exports = mongoose.model('psAdd',psAddAllSchema);