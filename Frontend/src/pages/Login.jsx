import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../Actions/Auth";

//mycss
//import "./Login.css";

//material ui compontents
import { CircularProgress } from "@mui/material";

function LoginPage() {
  //states
  const [isLogin, setlogin] = useState(false);
  //instead of boolean veriable make string of error or extra
  const [message, setmessage] = useState("");
  const [iserror, setiserror] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const user = useSelector((state) => state.User);
  const [formdata, setformdata] = useState({
    username: "",
    emailid: "",
    password: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //TODO: need to handle the navigation
  useEffect(() => {
    if (!user.fetching) {
      if (user.errors !== null) {
        setiserror(true);
        if (isLogin) {
          setmessage("Username or password is wrong");
        } else {
          setmessage("Username already exists or email is invalid");
        }
      } else {
        if (isSubmitted) {
          if (user.userdata.isEmailVerified) {
            navigate("/Main");
          } else {
            setiserror(true);
            setmessage(
              "Email is sent to you for verification these tab will close!!"
            );
            navigate("/VerifyPage");
            setisSubmitted(false);
          }
        }
      }
    }
  }, [user, navigate]);

  //after submit
  function handlesubmit(e) {
    e.preventDefault();
    if (isLogin || formdata.password === formdata.ConfirmPassword) {
      setisSubmitted(true);
      setiserror(false);
      if (!isLogin) {
        dispatch(register(formdata));
      } else {
        dispatch(login(formdata));
      }
    }
  }

  //just to toggle between login and signup
  function toggle(event) {
    setlogin(!isLogin);
    setformdata({
      username: "",
      emailid: "",
      password: "",
      ConfirmPassword: "",
    });
    setisSubmitted(false);
  }

  function handlechange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
    setisSubmitted(false);
  }


  //TODO: overflow when to much things in signup
  //TODO: in mobile view increase fonts ig
  //TODO: find good cirular component and make it centerd
  //TODO: manage the error bit in more shopesticated manner

  const reftoLogin = useRef(0);
  const reftoSignup = useRef(0);

  return (
    <>
      <div className="flex min-h-screen sm:bg-gray-200 bg-white justify-center font-Poppins overflow-scroll max-sm:text-lg">
        <div className="lg:min-w-96 sm:min-w-96 max-sm:w-full max-sm:min-h-screen sm:max-h-[581px] m-auto flex flex-col justify-center items-center shadow-md bg-white rounded px-6 py-12 lg:px-8 overflow-scroll">
          <h2 className="font-Poppins text-2xl max-sm:text-3xl">Transfer</h2>
          <nav
            onClick={toggle}
            className="flex font-Poppins mt-10 w-full gap-1 hover:cursor-pointer"
          >
            <div className="w-full text-center">
              <div
                ref={reftoLogin}
                className={
                  isLogin ? "text-black hover:pointer" : "text-gray-400"
                }
              >
                Login
              </div>
              <hr className={isLogin ? "border-black" : "border-gray-400"} />
            </div>
            <div className="w-full text-center">
              <div
                ref={reftoSignup}
                className={!isLogin ? "text-black" : "text-gray-400"}
              >
                Signup
              </div>
              <hr className={!isLogin ? "border-black" : "border-gray-400"} />
            </div>
          </nav>
          <form
            id=""
            className="flex flex-col mt-10 w-full"
            onSubmit={handlesubmit}
          >
            <label
              for="username"
              class="block text-sm font-lg font-Poppins leading-6 text-gray-900"
            >
              Username
            </label>
            <input
              value={formdata.username}
              name="username"
              type="text"
              className="my-1.5 block w-full font-Poppins rounded-md border-0 px-1.5 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
              required={true}
              placeholder="Enter Your Username"
              onChange={handlechange}
            ></input>
            {!isLogin && (
              <>
                <label
                  for="emailId"
                  class="block text-sm font-medium font-Poppins leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  value={formdata.emailid}
                  name="emailid"
                  type="email"
                  className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                  placeholder="emailId"
                  required={true}
                  onChange={handlechange}
                ></input>
              </>
            )}
            <label
              for="password"
              class="block text-sm font-medium font-Poppins leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              value={formdata.password}
              name="password"
              type="password"
              className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
              placeholder="Password"
              required={true}
              onChange={handlechange}
            ></input>
            {!isLogin && (
              <>
                <label
                  for="ConfirmPassword"
                  class="block text-sm font-medium font-Poppins leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  value={formdata.ConfirmPassword}
                  name="ConfirmPassword"
                  type="password"
                  required={true}
                  className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                  onChange={handlechange}
                ></input>
              </>
            )}
            {/* <div style={{ display: "flex", gap: "10px" }}>
            <input type="checkbox" id="remeber"></input>
            <label htmlFor="remeber">remeber me</label>
          </div> */}
            {!isLogin && formdata.ConfirmPassword !== formdata.password && (
              <span className="text-orange-400 text-center mt-4">
                Passwords Does not match
              </span>
            )}
            {isSubmitted &&
              (user.fetching || iserror ? (
                <div
                  class="m-12 text-center flex justify-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                iserror && (
                  <span className="text-orange-400 text-center mt-4">
                    {message}
                  </span>
                )
              ))}
            {!isSubmitted && (
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-950 text-white font-bold font-Poppins py-2 px-4 rounded mt-5"
              >
                {isLogin ? "Login" : "Signup"}
              </button>
            )}
          </form>
          {/* //TODO: add login with google and all */}
          {/* <h3 style={{margin:"0"}}>or</h3>
        <h3 style={{margin:"0"}}>Login With</h3>   */}
        </div>
      </div>
    </>
  );
}
export default LoginPage;
