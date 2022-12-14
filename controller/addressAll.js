const AddressAll = require("../model/addressAll");
const DisAddAll = require("../model/addSchema/dis-addAll")
const PsAddAll = require("../model/addSchema/ps-addAll");
const VillAddAll = require("../model/addSchema/vill-addAll");
const Vill = require("../model/address/vill")
const Ps = require("../model/address/ps")
const Dis = require("../model/address/dis");
const addressAll = require("../model/addressAll");

exports.getDis= async(req,res,next)=>{
    let value=[];

    AddressAll.aggregate(
        [
            {
              '$match': {
                'state': 'up'
              }
            }, {
              '$unwind': {
                'path': '$dis'
              }
            }, {
              '$project': {
                'dis.disId':1,
                'dis.disName': 1
              }
            }
        ]    
          ,
          function(err,data){
            if(err){
                console.log(err);
                throw err;
            }
            let len =data.length;
            for(let i =0 ;i < len ; i++){
                value.push(data[i].dis);
                // console.log(data[i].dis);
            }
            
            res.send(value);
            // console.log(value);
        }
        )
   
}
exports.getPs = async(req,res,next)=>{
    
   
    let psData=[];
    AddressAll.aggregate(
        [
            {
              '$match': {
                'state': 'up'
              }
            }, {
              '$unwind': {
                'path': '$dis'
              }
            }, {
              '$match': {
                'dis.disName': req.body.disName
              }
            }, {
              '$unwind': {
                'path': '$dis.ps'
              }
            }, {
              '$project': {
                'dis.ps.psName': 1
              }
            }
          ]
      ,
      function(err,data){
        if(err){
            console.log(err);
            throw err;
        }
        let len = data.length;

        for(let i =0 ; i<len; i++){
            psData.push(data[i].dis.ps)
          
        }
        res.send(psData);
      }

      )
}

exports.getVill=async (req,res,next)=>{
    let villData=[];
    AddressAll.aggregate(
        [
            {
              '$match': {
                'state': 'up'
              }
            }, {
              '$unwind': {
                'path': '$dis'
              }
            }, {
              '$match': {
                'dis.disName': req.body.disName
              }
            }, {
              '$unwind': {
                'path': '$dis.ps'
              }
            }, {
              '$match': {
                'dis.ps.psName': req.body.psName
              }
            }, {
              '$unwind': {
                'path': '$dis.ps.vill'
              }
            }, {
              '$project': {
                'dis.ps.vill.villName': 1, 
                'dis.ps.vill.villId': 1
              }
            }
          ]
          ,
          (err,data)=>{
            if(err){
                throw err;

            }
            let len = data.length;
            for(let i =0 ; i<len ; i++){
                villData.push(data[i].dis.ps.vill)
            }
            res.send(villData);
          }
    )
}

exports.addState = async(req,res,next)=>{
  const {stateName}= req.body
 
  const addressAll = new AddressAll({
    state:stateName,
  })
  addressAll.save()
  .then(result=>{
    res.send("State Added");
  })
}

exports.addDis = async(req,res,next)=>{
    const {disName,stateName}= req.body.userData;

    if(!disName || !stateName){
      res.status(400).send({
        error:"Please enter valid Data"
      })
      return;
    }
    //  console.log(req.body);
   const result = await AddressAll.findOne({state:stateName})

   if(!result){
    const addressAll = new AddressAll({
      state:stateName,
    })
    addressAll.save()
   }
  //  console.log(result);
  if(result){
    let disLength = result.dis.length;
  
    const disAddAll = new DisAddAll({
    
     disName:disName,
    })
    status= true;
    for(let i = 0 ; i <disLength; i++){
       if(result.dis[i].disName == disName){
         status = false;
         res.send("District already exist")
         return status;
       }
       else{
         status = true;
       }
    }
    if(status== true){
     result.dis.push(disAddAll)
     const result1 = await result.save();
      // console.log(disLength);
       res.send(result1);
      //  console.log(result1);
       
      //Update Data in District Database

    let disLength1 = result1.dis.length;
    // console.log(disLength1);
    for(let i = 0 ; i <disLength1; i++){
      if(result1.dis[i].disName == disName){
        const dis = new Dis({
          disName:result1.dis[i].disName,
        })
        dis.save();
      }
      
   }
    }
    else{
     res.send("District already exist")
    }
  }

   
}

exports.addPs = async(req,res,next)=>{
  const{stateName,disName,psName} = req.body.userData
  if(!disName || !stateName || !psName){
    
    res.status(400).send({
      error:"Please enter valid Police station"
    })
    return;
  }
  // console.log(req.body);
  const result = await AddressAll.findOne({state:stateName})
  // console.log(result);
  let disLength = result.dis.length;
  let psLength ;
  let disIndex=0;
  let psIndex =0;
  for(let i = 0 ; i<disLength; i++){
    if(result.dis[i].disName == disName){
      disIndex =i;
       psLength = result.dis[i].ps.length;
      // console.log(psLength);
      for(let j=0; j<psLength; j++){
        psIndex = j;
        if(result.dis[i].ps[j].psName==psName){
          res.status(400).send({
            error:"Police station Already present"
          })
          return;
        }
      }
            
      const psAddAll = new PsAddAll({
        psName:psName
      })
      result.dis[i].ps.push(psAddAll);
      result.save()
      .then(result1=>{
        res.send(result1);
        // let psLength1 = result1.dis[i].ps.length;
       
        if(!result1.dis[disIndex].ps[psIndex+1]){
          psIndex = -1;
        }
        const ps = new Ps({
          psName:result1.dis[disIndex].ps[psIndex+1].psName
        })
         ps.save()
        .then(psData=>{
          console.log(psData);
          Dis.findOne({disName:disName})
          .then(disData=>{
            const data = {
              psName:psName,
              psId:psData._id
            }
            disData.ps.push(data)
            disData.save();
            // console.log(disData);
          })
        })

      })
    }
  }
}

exports.addVill = async(req,res,next)=>{
  const{stateName,disName,psName,villName} = req.body.userData
  // console.log(req.body);
  if(!disName || !stateName || !psName || !villName){
    
    res.status(400).send({
      error:"Please enter valid Data"
    })
    return;
  }
  const result = await AddressAll.findOne({state:stateName})
  // console.log(result);
  let disLength = result.dis.length;
  for(let i=0; i<disLength; i ++){
    if(result.dis[i].disName == disName){
      // console.log("District name matched")
      let psLength = result.dis[i].ps.length;
      
      for(let j=0; j<psLength; j++){
        if(result.dis[i].ps[j].psName==psName){
          let villLength = result.dis[i].ps[j].vill.length;
          for(let k =0; k<villLength; k++){
            if(result.dis[i].ps[j].vill[k].villName==villName){
              res.status(400).send({
                error:"Village already exist"
              })
              return;
            }
          }
          // console.log("Ps name matched")
          let villAddAll = new VillAddAll({
            villName:villName
          })
          result.dis[i].ps[j].vill.push(villAddAll);
          const result1 = await result.save();
          res.send(result1);
          vill = new Vill({
            villName:villName
          })
          vill.save()
          .then(villData=>{
            const data = {
              villName : villName,
              villId : villData._id
            }
            Dis.findOne({disName:disName})
            .then(disData=>{
              disData.vill.push(data);
              disData.save();
            })

            Ps.findOne({psName:psName})
            .then(psData=>{
              
              psData.vill.push(data);
              psData.save();
            })
          })
        }
      }
      
     
    }
  }

}