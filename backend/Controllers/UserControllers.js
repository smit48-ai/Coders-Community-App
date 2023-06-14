import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

//getUser
export const getUser = async (req,res)=>{
    const user = await UserModel.findById(req.params.id);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json("User not found");
    }
}

//UpdateUser
//request will contain the user id to authorize and other detilas which are to be updated
export const updateUser = async(req,res)=>{
    if(req.body.id===req.params.id){
        if(req.body.Password){
            try{
                const new_hashed_password = await bcrypt.hash(req.body.Password,10);
                await UserModel.findByIdAndUpdate(req.body.id,{$set:{Password:new_hashed_password}});
                var object=req.body;
                const id=req.body.id;
                delete object.id;
                delete object.Password;
                await UserModel.findByIdAndUpdate(id,{$set:object});
                res.status(200).json("User details and Password are updated");
                // res.status(200).json("Password is Updated");
            }
            catch(err){
                res.json(500).json("Internal Server Error");
            }
        }
        else{
            try{
                var object=req.body;
                const id=req.body.id;
                delete object.id;
                await UserModel.findByIdAndUpdate(id,{$set:object});
                res.status(200).json("User details are updated");
            }
            catch(err){
                res.json(500).json("Internal Server Error");
            }
        }
    }
    else{
        res.status(401).json("You are not authorized to change");
    }
}

//Follow user
//id in paramter would be of the one whom to you follow
//id in req.body would be yours
export const FollowUser = async(req,res)=>{
    if(req.body.id!==req.params.id){
        const Follower=await UserModel.findById(req.body.id);
        const Following=await UserModel.findById(req.params.id);
        if(Follower.Following.includes(Following.id)){
            res.status(200).json("You already Follow this user");
        }
        else{
            Follower.Following.push(Following.id);
            Following.Followers.push(Follower.id);
            await Follower.save();
            await Following.save();
            res.status(200).json("You are now following");
        }
    }
    else{
        res.status(401).json("You cannot follow yourself");
    }
}


//UnFollow user
export const UnFollowUser = async(req,res)=>{
    if(req.body.id!==req.params.id){
        const Follower=await UserModel.findById(req.body.id);
        const Following=await UserModel.findById(req.params.id);
        if(Follower.Following.includes(Following.id)){
            Follower.Following=Follower.Following.filter((id)=>id!=Following.id);
            Following.Followers=Following.Followers.filter((id)=>id!=Follower.id);
            await Follower.save();
            await Following.save();
            res.status(200).json("You are now not following");
        }
        else{
            res.status(200).json("You already not Follow this user");
        }
    }
    else{
        res.status(401).json("You cannot follow yourself");
    }
}


export const TopFollowed=async(req,res)=>{
    try{
        const topuser= await UserModel.find({}).sort({Followers:-1}).limit(10);
        res.status(200).json(topuser);
    }
    catch(err){
        res.status(500).json("internal Server Error");
    }
}

//TODO: Problem is that if user is deleted than we have to reset follower, following, posts saved, etc...
//delete the account 
//TODO: deleteisnotimpelemented
export const DeleteUser = async(req,res)=>{
    try{
        const user= await UserModel.findById(req.params.id);
        if(user && user.id===req.body.id){
            await user.deleteOne();
            res.status(200).json("User is deleted");
        }
        else{
            res.status(401).json("You cannot delete others account");
        }
    }
    catch(err){
        res.status(500).json("internal Server Error");
    }
}