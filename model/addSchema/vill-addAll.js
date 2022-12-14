const mongoose = require("mongoose")


const villAddAllSchema = new mongoose.Schema({

                            "villName":String,
                            "villId":mongoose.Schema.Types.ObjectId
                        
    
})

module.exports = mongoose.model('villAdd',villAddAllSchema);