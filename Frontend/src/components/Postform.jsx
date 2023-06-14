import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import jwtDecode from "jwt-decode";


//material ui
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//actions
import {createPost} from '../Actions/Posts';
import {getCurrentUser} from '../Actions/user';

//css
import './Postform.css';
import { Navigate, useNavigate } from 'react-router-dom';
import isAuthenticated from '../assests/isAuthenticated';


function Postform(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [open,setopen]=useState(false);
    const CurrentUser=useSelector((state)=>state.User.userdata);
    const [TagName, setTagName]=useState("");
    const [formdata,setfromdata]=useState({
        Title: '',
        Author: '',
        Tags:[],
        Content: '',
        CoverImage:null,
     });

    

    //reffernce to textarea element same as selectior in js
    const textarea=useRef(null);

    //Toolbar effects
    function boldeffect(){
          var newtext=formdata.Content+"****";
          setfromdata({...formdata,Content:newtext});
          textarea.selectionEnd=textarea.selectionEnd-2;
    }
    
    function codeblock(){
        var newtext=formdata.Content+"``````";
        setfromdata({...formdata,Content:newtext});
        textarea.selectionEnd=textarea.selectionEnd-3;
    }

    function bulletedList(){
        var newtext=formdata.Content+"- item";
        setfromdata({...formdata,Content:newtext});
    }
    
    function numberedList(){
        var newtext=formdata.Content+'write like itemNo. space item Example: 1. item';
        setfromdata({...formdata,Content:newtext});
    }
    
    function italiceffect(){
        var newtext=formdata.Content+"**";
        setfromdata({...formdata,Content:newtext});
        textarea.selectionEnd=textarea.selectionEnd-1;
    }

    function urleffect(){
        var newtext=formdata.Content+"[enter Link name](enter link url)";
        setfromdata({...formdata,Content:newtext});
    }

    //TODO:add image feature also

    // function image(){
    //     var newtext=formdata.Content+'{url=""}';
    //     console.log(newtext);
    //     setfromdata({...formdata,Content:newtext});
    //     textarea.selectionEnd=textarea.selectionEnd-2;
    // }


    //Publish the post
    function Publish(event){
        event.preventDefault(); 
        formdata.Author = CurrentUser._id;
        dispatch(createPost(formdata));
        setopen(true);
        setTimeout(()=>{
           setopen(false);
        },(3000))
        setfromdata({
            Title: '',
            Author: '',
            Tags:[],
            Content: '',
            CoverImage:null,
            Likes:0,
         });
    }

    return (<form id="postform" method='post' encType='multipart/form-data' onSubmit={Publish}> 
        
         <div className='Writingarea'>
         <h1 >Create Post</h1>
         <div className="Writingarea1">
            <div style={{display:"flex"}}>
            <input id="Coverimage" type="file" style={{display:"none"}} onChange={(e)=>{
                setfromdata({...formdata,CoverImage:e.target.files[0]})
            }} ></input>
            <Button variant='contained' style={{background:"black", margin:"20px 0px", width:"fit-content"}} onClick={()=>{
                document.getElementById("Coverimage").click();
            }}>Cover Image</Button>
            <h3>{formdata.CoverImage?.name}</h3>
            </div>
           
            <input type="text" required={true} placeholder='Title..' name='Title' value={formdata.Title} onChange={(e)=>setfromdata({...formdata,Title:e.target.value})}></input>
         </div>
         <div className='Writingarea2'>
             <textarea ref={textarea} required={true} placeholder='Transfer Your knowledge....' value={formdata.Content} name="Content" onChange={(e)=>setfromdata({...formdata,Content:e.target.value})}></textarea>
             <div className='Tags-section'>
                {
                    formdata.Tags.map((tag)=>{
                        return <div className='tag-button'>
                            <div>{tag}</div>
                            <CancelIcon onClick={()=>{
                               const newTags=formdata.Tags.filter((x)=>{
                                    if(x===tag){
                                        return false;
                                    }
                                    else{
                                        return true;
                                    }
                                })
                               setfromdata({...formdata,Tags:newTags})
                            }}></CancelIcon>
                        </div>
                    })
                }
             </div>
             <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                <input type="text" placeholder='adds tags to your post' value={TagName} onChange={(e)=>{
                    setTagName(e.target.value)
                }}></input>
                <AddCircleIcon onClick={()=>{
                    setfromdata({...formdata,Tags:[...formdata.Tags,TagName]});
                    setTagName("");
                }}></AddCircleIcon>
             </div>
         </div>
         </div>
         <div className='remaining'>
             <div className='Toolbar'>
             <h2 className='Subheading'>Toolbar</h2>
                <ul>
                    <li onClick={boldeffect}><FormatBoldIcon/></li>
                    <li onClick={codeblock}><CodeIcon/></li>
                    <li onClick={bulletedList}><FormatListBulletedIcon/></li>
                    <li onClick={numberedList}><FormatListNumberedIcon/></li>
                    <li onClick={italiceffect}><FormatItalicIcon/></li>
                    <li onClick={urleffect}><InsertLinkIcon/></li>
                </ul>
             </div>
             <div className='Buttons'>
             <Button variant='contained' style={{background:"black", margin:"10px"}}>Save</Button>
             <Button variant='contained' type="submit" style={{background:"black", margin:"10px"}} onClick={Publish}>Publish</Button>
             </div>
         </div>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            message="Note archived"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          >
          <Alert variant="contained" severity="success" sx={{ width: '100%', background:"green", color:"white" }}>
           Post is Published successfully
          </Alert>
        </Snackbar>
         
    </form>
    );
}
export default Postform;