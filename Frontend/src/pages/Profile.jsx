import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import decode from "jwt-decode";
import {followUser, getUser, updateUser } from "../API/user";
import { getCurrentUser, UpdateProfileImg, UpdateCoverImg } from '../Actions/user';
import MainNavbar from '../components/MainNavbar';
import { getPosts } from '../Actions/Posts';
import Card from '../components/Card';
import { UpdateBio } from '../Actions/user';
import { FollowUser, UnFollowUser } from '../Actions/user';


//images and mui icon
import './Profile.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MailIcon from '@mui/icons-material/Mail';


// TODO: need to check for the instant profile and cover update

function Profile(){

     const PF=process.env.REACT_APP_PUBLIC_FOLDER;
     const [canedit,setedit]=useState(false);
     const [user,setuser]=useState(null);
     const posts=useSelector((state)=>state.posts);
     const [profileimg,setprofileimg]=useState(null);
     const [coverimg,setcoverimg]=useState(null);
     const currentUser=useSelector((state)=>state.User.userdata);
     const [isFollow, setisFollow]=useState(currentUser?.Following.includes(user?._id)?true:false);
     const params=useParams();
     const dispatch = useDispatch();
     const [Interest, setInterest]=useState("");
     const [Formdata,setFromdata]=useState({
          username:"",
          Interests:[],
          Description:"",
          Password:""
     })


     useEffect(()=>{
        if(user && currentUser){
            setisFollow(currentUser?.Following.includes(user?._id)?true:false);
        }
     },[currentUser,user]);

     const postofuser=posts?.filter((post)=>{
         return post.Author===user?._id;
     })

     function CountPosts(){        
          var ct=0;
          if(posts && user){
          for(var i=0; i<posts.length; i++){
               if(posts[i].Author===user._id){
                    ct++;
               }
            }
         }
         return ct;
     }
     const postcount=CountPosts();

     useEffect(()=>{
         async function getUserData(){
            const userData=await getUser(params.id);
            setuser(userData.data);
         }
        getUserData();
     },[params])

     async function handlefollow(){
        if(!isFollow){
           dispatch(FollowUser(currentUser?._id,params.id));
           setuser({...user, Followers:[...user.Followers, currentUser._id]});
        }
        else{
          dispatch(UnFollowUser(currentUser?._id,params.id));
          const newFollowersList=user.Followers.filter((x)=>x!==currentUser._id);
          setuser({...user, Followers:[...newFollowersList]})
        }
        
     }
     //for cover and profile images
     useEffect(()=>{
          if(profileimg){
               dispatch(UpdateProfileImg(profileimg, user))
          }
     },[profileimg,dispatch])
     
     useEffect(()=>{
          if(coverimg){
               dispatch(UpdateCoverImg(coverimg, user))
          }
     },[coverimg,dispatch])
     
     //other functions
     function grantedit(){
        setFromdata({
            username:user.username,
            Interests:user.Interests,
            Description:user.Description,
            Password:""
         })
         setedit(!canedit);
         
     }

     async function handleeditingProfile(){
         dispatch(UpdateBio(Formdata,user._id));
         setedit(!canedit);
     }
     
    return <div className='Profile'>
         <MainNavbar></MainNavbar>
         <div style={{ height:"100vh", overflowY:"scroll"}}>
         <div className='imagesection'>
              <img className='backgroundimg' src={user?.CoverPicture? PF+user?.CoverPicture : PF+"default_cover_img.jpg"}></img>
              <input id="Coverimage" type="file" accept=".jpg,.png" style={{display:"none"}} onChange={(e)=>{
                  setcoverimg(e.target.files[0]);
              }}></input>
              {currentUser?._id===user?._id && <Button variant='contained' className="cover-edit" style={{background:"white", color:"black", margin:"10px"}} onClick={()=>{
               document.getElementById("Coverimage").click();
               }}>Edit Cover img</Button>}

              <img className='profileimg' style={currentUser?._id!==user?._id?{left:"10vw"}:{}}src={user?.ProfilePicture? PF+user.ProfilePicture : PF+"dummy-profile-pic.png"}></img>
              <input id="Profileimage" type="file" accept=".jpg,.png" style={{display:"none"}} onChange={(e)=>{
                  setprofileimg(e.target.files[0]);
              }}></input>
              {currentUser?._id===user?._id && <Button variant='contained' className="profile-edit" style={{background:"black", margin:"10px"}} onClick={()=>{
               document.getElementById("Profileimage").click();
               }}>Edit Profile img</Button>}
              {/* <div className='ids'>
                   <InstagramIcon fontSize='large'/>
                   <LinkedInIcon fontSize='large'/>
                   <GitHubIcon fontSize='large'/>
              </div>      */}
         </div>
         <div className='cardssection'>
               <div className='leftcard'>
               <h2 style={{margin:"10px", background:"black", color:"white", padding:"10px", borderRadius:"10px"}}>🏆 MILESTONES</h2>
                    <ul>
                         <li><h3 style={{margin:0}}>🏹 Post count &nbsp;{postcount}</h3></li>
                         <li><h3 style={{margin:0}}>🏹 Followers &nbsp; {user?.Followers?.length}</h3></li>
                         <li><h3 style={{margin:0}}>🏹 Following &nbsp; {user?.Following?.length}</h3></li>
                         <li><h3 style={{margin:0}}>🏹 Tags following 10</h3></li>
                    </ul> 
               {user?._id!==currentUser?._id && <Button variant='contained' style={{background:"black", margin:"10px"}} onClick={()=>{
                   handlefollow();
               }}>{!isFollow?"Follow":"UnFollow"}</Button>}
               </div>
               <form className='Bio' style={{padding:"20px"}}>
                    <h2 style={{margin:"auto", background:"black", color:"white", padding:"10px", borderRadius:"10px"}}>🙋‍♂️ USER BIO</h2>
                     {canedit?<input type="text" placeholder='Username' value={Formdata.username} onChange={(e)=>{
                         setuser({...user,username:e.target.value})
                         setFromdata({...Formdata,username:e.target.value});
                     }}></input>:<h1 style={{margin:"auto", marginTop:"20px"}}> 😀 hi!! my name is {user?.username}</h1>}
                     {!canedit && <h3 style={{display:"flex", alignItems:"center", gap:"10px", marginTop:"30px"}}>You can reach out to me via <MailIcon style={{margin:"0px"}}/>  {user?.emailid}</h3>}
                     {canedit && <input type="password" placeholder='Password' value={Formdata.Password} onChange={(e)=>{
                        setFromdata({...Formdata, Password:e.target.value});
                     }}></input> }
                     {canedit? <><div className='Interests-section'>
                {   
                    Formdata.Interests.map((x)=>{
                        return <div className='interest-button'>
                            <div>{x}</div>
                            <CancelIcon onClick={()=>{
                               const newInterests=Formdata.Interests.filter((y)=>{
                                    if(y===x){
                                        return false;
                                    }
                                    else{
                                        return true;
                                    }
                                })
                               setFromdata({...Formdata,Interests:newInterests})
                            }}></CancelIcon>
                        </div>
                    })
                }
             </div>
             <div style={{display:"flex", alignItems:"center"}}>
                <input type="text" placeholder='add your interested areas of working'  style={{width:"300px", margin:"0px"}}value={Interest} onChange={(e)=>{
                    setInterest(e.target.value)
                }}></input>
                <AddCircleIcon onClick={()=>{
                    setFromdata({...Formdata,Interests:[...Formdata.Interests,Interest]});
                    setInterest("");
                }}></AddCircleIcon>
             </div></>:<div className='Interests-section' style={{display:"flex", flexDirection:"column", gap:"10px",border:"none"}}><h3>I am interested to work in 📚:</h3>
               {user?.Interests.length?<div style={{display:"flex"}}> {
                    user?.Interests.map((x)=>{
                        return <div className='interest'>
                            <div>{x}</div>
                        </div>
                    })
                }
                </div>: "      No interested areas of working"}
             </div>}
                     {canedit?<textarea placeholder="Write about your self.." value={Formdata.Description} onChange={(e)=>{
                         setuser({...user,Description:e.target.value})
                         setFromdata({...Formdata,Description:e.target.value});
                     }}></textarea>:<div><h3>Now read about me!!</h3><div className='Description' style={{}}><span>🔥</span> {user?.Description?user.Description:"Nothing to show here"} <span>🔥</span></div></div>}
                     <div style={{display:"flex", alignItems:"center",margin:"0px"}}>
                     {currentUser?._id===user?._id &&
                     <div onClick={grantedit}>
                     <Button variant='contained' style={{background:"black", margin:"0px"}} onClick={(e)=>{
                     }}>Edit Profile Details</Button>
                     </div>
                     }
                    
                     {canedit &&  <Button variant='contained' style={{background:"black", margin:"0px", height:"fit-content"}} onClick={(e)=>{
                         handleeditingProfile();
                     }}>Save</Button>}
                     </div>
               </form>
             
         </div>
         <div style={{display:"flex", alignContent:"center", flexDirection:"column", margin:"10vw", marginBottom:"100px"}}>
         <h1 style={{margin:"30px"}}>Posts by {user?.username}</h1>
         <div className='user-posts'>
           {postofuser?.map((x)=>{
            return <Card post={x}></Card>
           })
          }    
         </div>
         </div>
       
    </div>
    </div>
}

export default Profile;