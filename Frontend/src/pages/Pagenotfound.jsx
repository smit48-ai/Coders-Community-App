import React, { useEffect, useState } from 'react';



function Pagenotfound(){
    
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <img style={{width:"50vw", height:"50vw", margin:"auto", }} src={PF+"404page.jpg"}></img>
    );
}

export default Pagenotfound;