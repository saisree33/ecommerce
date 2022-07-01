const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
const authHeader=req.get('Authorization');

if(!authHeader){
    req.isAuth=false;
    return next();
}
const token=authHeader.split(' ')[1];
console.log("token is",token)
if(!token||token===''){
    req.isAuth=false;
    return next();
}
try{
   decodedtoken= jwt.verify(token,"6QbElGYy21lFxCdK1d3UfcoR8VDB5Vit")
}
catch(err){
    req.isAuth=false;
    return next();
}
if(!decodedtoken){
    req.isAuth=false;
    return next();
}
req.isAuth=true;
req.email=decodedtoken.email;
next();
}

