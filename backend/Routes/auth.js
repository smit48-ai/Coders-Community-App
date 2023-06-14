import express from 'express';
import Usermodel from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'; //for salting and hashing the password
import {sendEmail} from '../utils/sendEmail.js';
const router=express.Router();

// Global Constants
const saltrounds=10;

// <-----------------------------------------Register------------------------------------>
router.post("/register", async (req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,saltrounds);
        const NewUser = new Usermodel({...req.body, Password:hashedPassword});
        await NewUser.save();
        const token = jwt.sign({userId:NewUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        //email verification changes
        const url= `${process.env.BASE_URL}/${NewUser.id}/verify/${token}`;
        await sendEmail(NewUser.emailid, "Verify Email", url);
        //email verification changes
        res.status(200).json({user:NewUser,token});
    }
    catch(err){
        console.log(err);
        res.status(401).json("Error in Register")
    }
})



//<----------------------------------------Login----------------------------------->
router.post("/Login", async(req,res)=>{
    try{
        const user = await Usermodel.findOne({username:req.body.username});
        if(user){
            const match = await bcrypt.compare(req.body.password, user.Password);
            if(match){
                const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
                if(!user.isEmailVerified){
                     //email verification changes
                       const url= `${process.env.BASE_URL}/${user.id}/verify/${token}`;
                       await sendEmail(user.emailid, "Verify Email", url);
                     //email verification changes
                }
                res.status(200).json({user,token});
            }
            else{
                res.status(401).json("Password is Wrong");
            }
        }
        else{
            res.status(404).json("no such user exists");
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500).json("Error in Login");
    }
  
})



//verify email route
//TODO: add token expired logic as well;
router.get("/:id/verify/:token",async (req,res)=>{

    try{
        const user = await Usermodel.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: "Invalid link" });
        const userid=req.params.id;
        const token=req.params.token;
        if(!token) return res.status(400).json({ message: "Invalid link" });
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.exp< Date.now() / 1000) return res.status(400).json({ message: "Token expired" });
        user.isEmailVerified=true;
        await user.save();
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch(err){
        res.status(500).json("Internal server error");
    }

})

export default router;

