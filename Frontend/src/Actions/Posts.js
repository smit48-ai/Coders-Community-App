import * as api from '../API/posts.js';
import * as upload_api from '../API/upload.js';

export const getPosts = function(){
    return async function(dispatch){
        try{ 
             const {data} = await api.fetchPosts();
             dispatch({type:'FETCH_ALL', payload: data});
        }
        catch(error){
            console.log(error.message);
        }
    }
    
};

export const createPost=function(Formdata){
    return async function(dispatch){
        try{ 
            if(Formdata.CoverImage){
                const uniquefilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + Formdata.CoverImage.name;
                const data = new FormData();
                data.append("name",uniquefilename)
                data.append("file",Formdata.CoverImage);
                Formdata.CoverImage=uniquefilename;
                await upload_api.uploadCoverImg(data);
            }
            const post=await api.createPost(Formdata);
            dispatch({type:'CREATE', payload:post.data});
       }
       catch(error){
           console.log(error.message);
       }
    }
}


export const likethePost=function(userid,id){
    return async function(dispatch){
        try{
            const likedPost = await api.likethePost(userid,id);
            dispatch({type:'LIKEPOST', payload:likedPost.data});
        }
        catch(error){
            console.log(error);
        }
    }
}

export const unlikethePost=function(userid,id){
    return async function(dispatch){
        try{
            const unlikedPost=await api.unlikethePost(userid,id);
            dispatch({type:'UNLIKEPOST', payload:unlikedPost.data});
        }
        catch(error){
            console.log(error);
        }
    }
}
export const savethePost=function(userid,id){
    return async function(dispatch){
        try{
            
            const savedPost=await api.savethePost(userid,id);
            dispatch({type:'SAVETHEPOST', payload:savedPost.data});
        }
        catch(error){
            console.log(error);
        }
    }
}
export const unsavethePost=function(userid,id){
    return async function(dispatch){
        try{
            const unsavedPost=await api.unsavethePost(userid,id);
            dispatch({type:'UNSAVETHEPOST', payload:unsavedPost.data});
        }
        catch(error){
            console.log(error);
        }
    }
}

export const deletePost=function(id){
    console.log("is coming");
    return async function(dispatch){
        try{
            await api.deletePost(id);
            dispatch({type:"DELETEPOST", payload:id});
        }
        catch(err){
            console.log(err);
        }
    }
}


export const postbysearch=function(search){
    return async function(dispatch){
        try{
            const posts=await api.getpostsbysearch(search);
            dispatch({type:"FETCHPOSTSBYSEARCH", payload:posts.data});
        }
        catch(err){
           console.log(err);
        }
    }
}