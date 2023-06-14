import React from 'react';
import './Header.css';

function Header(){
    return <div className='header1'>
        <h1>Create Post</h1>
        <div>
             <button className='loginbutton'>Edit</button>
             <button className='loginbutton'>Preview</button>
       </div>
    </div>
}

export default Header;