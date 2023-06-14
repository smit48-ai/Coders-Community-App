import jwt from "jsonwebtoken";
//TODO: middleware dalna baki hai abhi


//request me hoga token ye to bahi jwt ka niyam hai
//ab me kya karunga header ka id request ma dalunga
//fir check karunga
export const auth = (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.id=decoded?.userId;
        next();
    }
    catch(err){
        console.log(err);
    }
   
}