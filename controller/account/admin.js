
const Admin = require("../../model/account/admin")
const jwt = require("jsonwebtoken")
const Creator = require("../../model/account/creator")
const Supervisor = require("../../model/account/supervisor")
const { default: mongoose } = require("mongoose")

exports.signUpAdmin = async(req,res,next)=>{
    const {name , email, password} = req.body;
    const adminData= await Admin.findOne({aEmail:aEmail})
    if(adminData){
     res.status(400).send({
         error:"User already exist"
     })
     return;
    }
    const admin = new Admin({
        name:name,
        email:email,
        password:password
    })
    admin.save()
    .then(adminData=>{
        res.send(adminData);
    })
}

exports.logInAdmin = async(req,res,next)=>{
    const {email , password} =req.body;
  
   const adminData= await Admin.findOne({email:email})
   console.log(adminData);
   if(!adminData){
    res.status(400).send({
        error:"Invalid Credential"    
    })
    return;
   }
   if(adminData.password !== password){
    res.status(400).send({
        error:"Invalid Credential"    
    })
    return;
   }
   const token = jwt.sign(
    {
        email:adminData.email,
        _id:adminData._id
        
    },"ThisIsImportantSecretKey",
    {expiresIn: '6h' }
   )
   res.status(200).json(
    {
        type:"admin",
        token:token,
        _id:adminData._id,
        email:adminData.email,
        name:adminData.name,
    }
   )

}

exports.addSupervisor = async(req,res,next)=>{
    const {userData} = req.body;
    // console.log(userData);
   const supervisorData= await Supervisor.findOne({email:userData.email});
//    console.log(supervisorData);
   if(supervisorData){
    res.status(400).send("User Already exist");
    return ;
   }
//    console.log(userData);
   const supervisor = new Supervisor({
    name:userData.name,
    fatherName:userData.fatherName,
    email:userData.email,
    password:userData.password,
    aadharNo:userData.aadharNo,
    dis:userData.dis,
    ps:userData.ps,
    vill:userData.vill
   })

   supervisor.save()
   .then(result=>{
    userId = mongoose.Types.ObjectId(req.userId);
    res.send(result)
    Admin.findById(userId)
    .then(adminData=>{
        const data ={
            supName:result.name,
            supId:result._id
        }
        // console.log(adminData);
        adminData.supList.push(data)
        adminData.save()
        .then(result1=>{
            // console.log(result1);
        })
        
    })
   })
    .catch(err=>{
        console.log("error handled");
       })
}