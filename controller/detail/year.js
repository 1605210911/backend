const { ConnectionStates } = require("mongoose");
const Year = require("../../model/detail/year")


exports.addYear = async(req,res,next)=>{
    const {year} = req.body.yearData;
  const yearData= await Year.findOne({year:year});
  if(yearData){
    res.status(400).send({
        error:"year already present"
      })
      return;
  }

  const year1 = new Year({
    year:year
  })
  year1.save()
  .then(result=>{
    res.send(result);
  })

}
exports.getYears = async(req,res,next)=>{
    Year.aggregate(
        [
            {
              '$project': {
                'year': 1
              }
            }
          ],

(err,data)=>{
    if(err){
        throw err;
    }
    res.send(data);
}
)
}
