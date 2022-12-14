const Act = require("../../model/detail/act")

exports.addAct = async(req,res,next)=>{
const{actName} = req.body.actData;
const actData = await Act.findOne({actName:actName});
if(actData){
    res.status(400).send({
        error:"Act already present"
      })
      return;
}
const act = new Act({
    actName:actName
})
act.save()
.then(result=>{
    res.send(result);
})
}

exports.getActs = async(req,res,next)=>{
    const actData = await Act.find({});
if(!actData){
    res.status(400).send({
        error:"No Act Found"
      })
      return;
}
Act.aggregate(
    [
        {
          '$project': {
            'actName': 1
          }
        }
    ],
    (err,data)=>{
        if(err){
            res.status(400).send(err);
        }
        res.status(200).send(data);
    }
)

}

exports.addSec = async(req,res,next)=>{
    const {actName,secName} = req.body.secData;
    const actData = await Act.findOne({actName:actName})
    const secLength = actData.secDetail.length;
    for(let i =0; i < secLength; i++){
        if(actData.secDetail[i].secName==secName){
            res.status(400).send({
                error:"Section Already present"
              })
              return;
        }
    }
    const secData = {
        secName:secName,
        crimeList:[]
    }
    actData.secDetail.push(secData);
    actData.save()
    .then(result1=>{
        res.status(200).send(result1);
    })
}

exports.getSecs = async(req,res,next)=>{
    const {actName}= req.body
    Act.aggregate(
        [
            {
              '$match': {
                'actName': actName
              }
            }, {
              '$unwind': {
                'path': '$secDetail'
              }
            }, {
              '$project': {
                'secDetail.secName': 1
              }
            }
          ],
          (err,data)=>{
            if(err){
                res.status(400).send(err)
            }
            res.status(200).send(data);
          }
    )
}