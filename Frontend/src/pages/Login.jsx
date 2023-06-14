import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { register, login } from "../Actions/Auth";

//mycss
import "./Login.css";


//material ui compontents
import { CircularProgress } from '@mui/material';


function LoginPage() {
  //states
  const [isLogin, setlogin] = useState(false);
  //instead of boolean veriable make string of error or extra
  const [message,setmessage]=useState("");
  const [iserror, setiserror]=useState(false);
  const [isSubmitted, setisSubmitted]=useState(false);
  const user = useSelector((state)=>state.User);
  const [formdata, setformdata] = useState({
    username:"",
    emailid:"",
    password:"",
    ConfirmPassword:""
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  
  //TODO: need to handle the navigation
  useEffect(()=>{
    if(!user.fetching){
      if(user.errors!==null){
        setiserror(true);
        if(isLogin){
          setmessage("Username or password is wrong");
        }
        else{
          setmessage("Username already exists or email is invalid")
        }
      }
      else{
        if(isSubmitted){
          if(user.userdata.isEmailVerified){
            navigate("/Main");
          }
          else{
            setiserror(true);
            setmessage("Email is sent to you for verification these tab will close!!");
            navigate("/VerifyPage");
            setisSubmitted(false);
          }
        }
      }
    }
  },[user,navigate])
  
  //after submit
  function handlesubmit(e){
    e.preventDefault();
    if(isLogin || formdata.password===formdata.ConfirmPassword){
      setisSubmitted(true);
      setiserror(false);
      if(!isLogin){
        dispatch(register(formdata));
      }
      else{
        dispatch(login(formdata));
      }
    } 
  }

  //just to toggle between login and signup
  function toggle(event) {
    setlogin(!isLogin);
    setformdata({
      username:"",
      emailid:"",
      password:"",
      ConfirmPassword:""
    })
    setisSubmitted(false);
  }

  function handlechange(e){
    setformdata({...formdata, 
    [e.target.name]: e.target.value
    });
    setisSubmitted(false);
  }

  const style1 = {
    color: "White",
    backgroundColor: "Black",
    borderRadius: "10px",
  };
  const style2 = {
    color: "Black",
    BackgorundColor: "None",
  };
  const reftoLogin = useRef(0);
  const reftoSignup = useRef(0);

  return (
    <>
      <form id="LoginForm" onSubmit={handlesubmit}>
        <div className="Login_Box">
          <h2 className="AppName">Transfer</h2>
          <nav onClick={toggle}>
            <span ref={reftoLogin} style={isLogin ? style1 : style2}>
              Login
            </span>
            <span ref={reftoSignup} style={!isLogin ? style1 : style2}>
              Signup
            </span>
          </nav>
          <input
            value={formdata.username}
            name="username"
            type="text"
            className="logincredentials"
            required={true}
            placeholder="Username"
            onChange={handlechange}
          ></input>
           {!isLogin && (
            <input
              value={formdata.emailid}
              name="emailid"
              type="email"
              className="logincredentials"
              placeholder="emailId"
              required={true}
              onChange={handlechange}
            ></input>
           )
           }
          <input
            value={formdata.password}
            name="password"
            type="password"
            className="logincredentials"
            placeholder="Password"
            required={true}
            onChange={handlechange}
          ></input>
          {!isLogin && (
            <input
              value={formdata.ConfirmPassword}
              name="ConfirmPassword"
              type="password"
              required={true}
              className="logincredentials"
              placeholder="Confirm Password"
              onChange={handlechange}
            ></input>
          )}
          {/* <div style={{ display: "flex", gap: "10px" }}>
            <input type="checkbox" id="remeber"></input>
            <label htmlFor="remeber">remeber me</label>
          </div> */}
          {(!isLogin && formdata.ConfirmPassword!==formdata.password) &&  <h3 style={{color:"red", fontFamily:"monospace"}}>Passwords Does not match</h3> }
          {isSubmitted && ((user.fetching || !iserror)?<CircularProgress style={{color:"black"}}></CircularProgress>:(iserror && <h3 style={{color:"red", fontFamily:"monospace"}}>{message}</h3>))}
          <button type="submit" className="buttonv3">
            {isLogin ? "Login" : "Signup"}
          </button>
          {/* //TODO: add login with google and all */}
          {/* <h3 style={{margin:"0"}}>or</h3>
        <h3 style={{margin:"0"}}>Login With</h3>   */}
        </div>
      </form>
    </>
  );
}
export default LoginPage;
