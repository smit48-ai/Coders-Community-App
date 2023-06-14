import React from 'react'

const VerifyEmail = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div style={{height:"100vh",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h1 style={{color:"red"}}>Email is sent to you Verify it!!</h1>
         <img style={{width:"50vw", height:"40vw", margin:"auto"}} src={PF+'VerifyEmail.jpg'}></img>
    </div>
   
  )
}

export default VerifyEmail