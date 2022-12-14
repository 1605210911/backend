const mongoose = require("mongoose")


const actSchema = new mongoose.Schema({

            actName:String,
            secDetail:[
                {
                    secName:String,
                    crimeList:[
                        {
                            type:mongoose.Schema.Types.ObjectId,
                            ref:'address'
                        }
                    ]
                }
            ]

      
})

module.exports = mongoose.model('act',actSchema);