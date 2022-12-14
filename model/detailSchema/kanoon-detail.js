const mongoose = require("mongoose")


const kanoonDetailSchema = new mongoose.Schema({
            kName:String,
            dharaDetail:[
                {
                    dhara:String
                }
            ]

      
})

module.exports = mongoose.model('Kanoondetail',kanoonDetailSchema);