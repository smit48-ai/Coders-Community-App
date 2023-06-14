import React from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Link } from 'react-router-dom';
import './Intro.css';

function tomain(){
      document.querySelectorAll("homescreen")[0].style.color="black";
}

function Intro(props){
       return <div className="Intro">
       <div className="grid-container midpart">
             <h1 className='message'>Learning starts when you are able to make other learn</h1>
       </div>
       <div className='grid-container'>
             <Link to="/Login"><button className='loginbutton grid-item'>JOIN US</button></Link>
       </div>
       {/* <span onClick={tomain}><a href="/Main"><KeyboardDoubleArrowDownIcon fontSize="large"></KeyboardDoubleArrowDownIcon></a></span> */}
       </div>
 }

 export default Intro;