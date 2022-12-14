const Creator = require("../../model/account/creator")
const jwt = require("jsonwebtoken");
const Supervisor = require("../../model/account/supervisor")
const Admin = require("../../model/account/admin");


exports.creatorLogIn = async(req,res,next)=>{
    const {email,password} = req.body;
    // console.log(req.body);
    const creatorData = await Creator.findOne({email:email})
    if(!creatorData){
        res.status(400).send({
            error:"Invalid Credential0"    
        })
        return;
    }
    console.log(creatorData)
    if(creatorData.password !== password){
        res.status(400).send({
            error:"Invalid Credential 1"    
        })
        return;
    }
    const token = jwt.sign(
        {
            email:creatorData.email,
            _id:creatorData._id
            
        },"ThisIsImportantSecretKey",
        {expiresIn: '6h' }
    )

    res.status(200).json(
        {
            type:"creator",
            token:token,
            _id:creatorData._id,
            email:creatorData.email,
            name:creatorData.name,
        }
       )
}


