const mongoose = require("mongoose")


const addressAllSchema = new mongoose.Schema({
    "state":String,
    "stateId":mongoose.Schema.Types.ObjectId,
    "dis":[
        {
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
        }
    ]
}
)

module.exports = mongoose.model('addressAll',addressAllSchema);