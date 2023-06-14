import * as api from "../API/user.js"
import * as upload_api from "../API/upload.js";
import jwtDecode from "jwt-decode";


export const getCurrentUser = function(){
    return async function(dispatch){
        try{
            const token = localStorage.getItem("profile");
            const decodedData=jwtDecode(token);
            const userdata=await api.getUser(decodedData.userId);
            dispatch({type:'GETUSER',payload:userdata.data});
        }
        catch(Err){
            console.log(Err);
        }
    }
}


export const FollowUser = function(userid,id){
    return async function(dispatch){
        try{
            await api.followUser(userid,id);
            dispatch({type:"FOLLOW", payload:id})
        }
        catch(err){
            console.log(err);
        }
    }
}

export const UnFollowUser=function(userid,id){
    return async function(dispatch){
        try{
            await api.UnFollowUser(userid,id);
            dispatch({type:"UNFOLLOW", payload:id});
        }
        catch(err){
            console.log(err);
        }
    }
}


export const UpdateProfileImg = function(file, userdata){
    return async function(dispatch){
        try{
            console.log(file);
            const uniquefilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.name;
            console.log(uniquefilename);
            const data=new FormData();
            data.append("name",uniquefilename)
            data.append("file",file);
            await upload_api.uploadProfileImg(data);
            const datatosend={
                _id:userdata._id,
                ProfilePicture:uniquefilename
            }
            await api.updateUser(datatosend);
            dispatch({type:"UPDATEPROFILEIMG", payload:uniquefilename})
        }
        catch(Err){
            console.log(Err);
        }
    }
}


export const UpdateCoverImg = function(file, userdata){
    return async function(dispatch){
        try{
            const uniquefilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.name;
            const data=new FormData();
            data.append("name",uniquefilename)
            data.append("file",file);
            await upload_api.uploadCoverImg(data);
            const datatosend={
                _id:userdata._id,
                CoverPicture:uniquefilename
            }
            await api.updateUser(datatosend);
            dispatch({type:"UPDATECOVERIMG", payload:uniquefilename})
        }
        catch(Err){
            console.log(Err);
        }
    }
}

export const TopFollowed=function(){
    return async function(dispatch){
        try{
            const topusers = await api.fetchTopFollowed();
            dispatch({type:"TOPFOLLOWED", payload:topusers.data});
        }
        catch(error){
            console.log(error);
        }
    }
}


export const UpdateBio=function(FormData, userid){
    return async function(dispatch){
        try{
            if(FormData.Password.length===0){
                delete FormData.Password;
            }
            const datatosend={...FormData,
              _id:userid
            }
            await api.updateUser(datatosend);
            dispatch({type:"UPDATEBIO", payload:FormData})
        }
        catch(error){
            console.log(error);
        }
    }
}
