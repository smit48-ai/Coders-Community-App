import React from 'react';
import { Link } from 'react-router-dom';
import './Menulist.css';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import StyleIcon from '@mui/icons-material/Style';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';


function MenuList(props){

     return <div className={props.isopen? "hamburgermenu" : "Listclass"}>
     <ul>
        {props.isopen && <li onClick={props.closemenu}><CloseIcon className="close-icon"></CloseIcon></li>}
        <li><Link to="/Main" style={{color:"black", textDecoration:"none", padding:"0px"}}><HomeIcon/><a href="">Home</a></Link></li>
        <li style={{paddingBottom:"5px"}}><Link to="/Post" style={{color:"black", textDecoration:"none", padding:"0px"}}><CreateIcon/><a href="" style={{paddingBottom:"2px"}}>Create Post</a></Link></li>
        <li style={{paddingBottom:"0px"}}><Link to="/SavePosts" style={{color:"black", textDecoration:"none", padding:"0px"}}><ListIcon/><a href="">Saved list</a></Link></li>
        <li><StyleIcon/><a href="">Tags</a></li>
        <li><PhoneIcon/><a href="">Contact me</a></li>
     </ul>
     </div>
}

export default MenuList;