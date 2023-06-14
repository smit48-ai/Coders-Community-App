import Postmodel from "../models/Post.js";


export const getAllPosts = async function (req,res){
    try{
        const allposts = await Postmodel.find().sort({createdAt:-1});
        res.status(200).json(allposts);
    }
    catch(error){
        res.status(500).json("Internal Server error");
    }
}

export const createPost = async function(req,res){
    if(req.body.Author===req.body.id){
        var obj=req.body;
        delete obj.id;
        const newpost = new Postmodel({...obj});
        try{
            await newpost.save();
            res.status(200).json(newpost);
        }
        catch(err){
            res.status(500).json("Internal Server Error");
        }   
    }
    else{
        res.status(401).json("Not authorized");
    }
       
}

//user will go to /id of post so we have id of post in params
//and when user update userid will also be sent
export const updatePost = async function(req,res){
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post && Post.Author===req.body.userid){
            var change=req.body;
            delete change.userid;
            await Postmodel.findByIdAndUpdate(Post.id,{...change});
            res.status(200).json("Post is Updated");
        }
        else{
            res.status(500).json("No such post exists");
        }
    }
    catch(err){
         res.status(500).json("Internal Sever Error");
    }
}

//deleting the post if authorized to do so
export const deletePost = async function(req,res){
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post && Post.Author===req.body.id){
            await Post.deleteOne();
            res.status(200).json("Post is deleted");
        }
        else{
            res.status(500).JSON("No such post exists");
        }
    }
    catch(err){
         res.status(500).JSON("Internal Sever Error");
    }
}


//savePost
export const SavePost = async(req,res)=>{
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post){
            if(!Post.Saves.includes(req.body.id)){
                Post.Saves.push(req.body.id);
                await Post.save();
                res.status(200).json(Post);
            }       
            else{
                res.status(200).json("You have already saved these post");
            }
        }
        else{
            res.status(404).json("Post does not exist")
        }
    }
    catch(err){
        res.status(500).json("Internal Server error");
    }
}

//unsave the post
export const UnSavePost = async(req,res)=>{
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post){
            if(Post.Saves.includes(req.body.id)){
                Post.Saves = Post.Saves.filter((Id)=>Id!==req.body.id);
                await Post.save();
                res.status(200).json(Post);
            }
            else{
                res.status(200).json("You have already not saved these post");
            }
        }
        else{
            res.status(404).json("Post does not exist")
        }
    }
    catch(err){
        res.status(500).json("Internal Server error");
    }
}


//like a post
export const LikePost = async(req,res)=>{
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post){
            if(!Post.Likes.includes(req.body.id)){
                Post.Likes.push(req.body.id);
                await Post.save();
                res.status(200).json(Post);
            }
            else{
                res.status(200).json(Post);
            }
        }
        else{
            res.status(404).json("Post does not exist")
        }
    }
    catch(err){
        res.status(500).json("Internal Server error");
    }
}

//UnlikePost
export const UnLikePost = async(req,res)=>{
    try{
        const Post = await Postmodel.findById(req.params.id);
        if(Post){
            if(Post.Likes.includes(req.body.id)){
                Post.Likes=Post.Likes.filter((Id)=>Id!==req.body.id);
                await Post.save();
                res.status(200).json(Post);
            }
            else{
                res.status(200).json("You have not Liked these post");
            }
        }
        else{
            res.status(404).json("Post does not exist")
        }
    }
    catch(err){
        res.status(500).json("Internal Server error");
    }
}


export const CommentPost=async(req,res)=>{
    try{
        if(req.body.Author===req.body.id){
            const Post = await Postmodel.findById(req.params.id);
            if(Post){
               Post.comments.push(req.body);
               await Post.save();
               res.status(200).json("Successfully added comment");
            }
            else{
               res.status(404).json("Post not found");
            }
        }
        else{
            res.status(401).json("not authorized");
        }
     
    }
    catch(err){

    }
}

export const postsbysearch=async function(req,res){
    try{
        //index method
        // const postsmatched = await Postmodel.find({ $text: { $search: req.query.content } })
        const postsmatched = await Postmodel.find({
            $or: [{ Title: { $regex: req.query.content, $options: 'i' }},
            { Content: { $regex: req.query.content, $options: 'i' }},
            { Tags:{ $elemMatch :{ $regex: req.query.content, $options: 'i' }}},
            ]}).sort({createdAt:-1});
        console.log(postsmatched);
        res.status(200).json(postsmatched);
    }
    catch(err){
        res.status(500).json("Internal server error");
    }
}

//TODO: Need to implement latter on
//Recommendated Posts --> Based on Likes
// export const getRecommendations = async function(req,res){
//     try{
         
//     }
//     catch(err){

//     }
// }

// //Your Feed  --> Based on following and Tags
// export const getFeed = async(req,res)=>{

// }

