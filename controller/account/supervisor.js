const Supervisor = require("../../model/account/supervisor")
const Creator = require("../../model/account/creator")
const jwt = require("jsonwebtoken");

exports.supervisorLogIn = async(req,res,next)=>{
    const {email ,password} = req.body;
    const supervisorData = await Supervisor.findOne({email:email})
    if(!supervisorData){
        res.status(400).send({
            error:"Invalid Credential"    
        })
        return;
    }
    if(supervisorData.password !== password){
        res.status(400).send({
            error:"Invalid Credential"    
        })
        return;
    }
    const token = jwt.sign(
        {
            email:supervisorData.email,
            _id:supervisorData._id
            
        },"ThisIsImportantSecretKey",
        {expiresIn: '6h' }
    )
    res.status(200).json(
        {
            type:"supervisor",
            token:token,
            _id:supervisorData._id,
            email:supervisorData.email,
            name:supervisorData.name,
        }
       )
}
exports.addCreator = async(req,res,next)=>{
    const {userData} = req.body;
    const creatorData = await Creator.findOne({email:userData.email})
    if(creatorData){
        res.status(400).send("User Already exist");
        return ;
       }
    //    console.log(userData);
       const creator = new Creator({
        name:userData.name,
        fatherName:userData.fatherName,
        email:userData.email,
        password:userData.password,
        aadharNo:userData.aadharNo,
        dis:userData.dis,
        ps:userData.ps,
        vill:userData.vill
       })

       creator.save()
       .then(result=>{
        console.log(result);
        res.send(result);
        userId = mongoose.Types.ObjectId(req.userId);
        Supervisor.findById(userId)
        .then(supervisorData=>{
            const data ={
                creName:result.name,
                creId:result._id
            }
            supervisorData.creList.push(data);
            supervisorData.save()
            .then(result=>{

            })
        })
       })
       .catch(err=>{
        console.log("error handled");
       })
}