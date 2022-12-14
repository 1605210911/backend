const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const {authHeader,userData} = req.body;
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    const token = authHeader.token.split(' ')[1];
    try{
        decodedToken = jwt.verify(token,"ThisIsImportantSecretKey")
    }
    catch(err){
        req.isAuth = false;
        return next;
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
  
    req.userId =decodedToken._id;
    req.isAuth = true;
    next();
}