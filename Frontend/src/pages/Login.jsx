import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../Actions/Auth";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";

//material ui compontents
import GoogleSignIn from "../components/GoogleSignIn";

function LoginPage() {
  //states
  const [isLogin, setlogin] = useState(false);
  //instead of boolean veriable make string of error or extra
  const [message, setmessage] = useState("");
  const [iserror, setiserror] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [matchMessage, setmatchMessage] = useState("");
  const user = useSelector((state) => state.User);
  const [formdata, setformdata] = useState({
    username: "",
    emailid: "",
    password: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log("navigation changed");

    const token = searchParams.get("token");
    console.log("token", token);

    if (token) {
      localStorage.setItem("profile", token);
      // dispatch(getCurrentUser());
      navigate("/Main");
    }
  }, [navigate, searchParams, dispatch]);

  //TODO: need to handle the navigation
  useEffect(() => {
    if (!user.fetching) {
      if (user.errors !== null) {
        console.log("user.error", user.errors);

        setiserror(true);
        if (isLogin) {
          setmessage("Username or password is wrong");
        } else {
          setmessage("user with given email already exists");
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
  }, [user, navigate, isLogin, isSubmitted]);

  //after submit
  function handlesubmit(e) {
    e.preventDefault();
    console.log(e);

    if (isLogin || formdata.password === formdata.ConfirmPassword) {
      setisSubmitted(true);
      setiserror(false);
      if (!isLogin) {
        dispatch(register(formdata));
      } else {
        dispatch(login(formdata));
      }
    } else {
      setmatchMessage("Password and confirm password does not match");
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

  return !searchParams.get("token") ? (
    <>
      <div className="flex min-h-screen sm:bg-gray-200 bg-white justify-center font-Poppins overflow-scroll max-sm:text-lg">
        <div className="lg:w-96 sm:min-w-96 max-sm:w-full max-sm:min-h-screen  m-auto flex flex-col justify-center items-center shadow-md bg-white rounded px-6 py-12 lg:px-8 overflow-scroll">
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
            {!isLogin && (
              <>
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
                  className="my-1.5 block w-full font-Poppins rounded-md border-0 px-1.5 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 text-sm leading-6"
                  required={true}
                  placeholder="Enter your username"
                  onChange={handlechange}
                ></input>
              </>
            )}

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
                className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 text-sm leading-6"
                placeholder="Enter your email"
                required={true}
                onChange={handlechange}
              ></input>
            </>

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
              className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 text-sm leading-6"
              placeholder="Enter your password"
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
                  className="my-1.5 block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  placeholder:font-Poppins focus:ring-2 focus:ring-inset focus:ring-neutral-900 text-sm leading-6"
                  placeholder="Confirm your password"
                  onChange={handlechange}
                ></input>
              </>
            )}
            {!isLogin && matchMessage !== "" && (
              <div className="mt-2 px-4 py-3 border border-red-500 bg-red-500/10 text-red-600 rounded-md shadow-sm animate-fade-in">
                <p className="text-sm font-medium">{matchMessage}</p>
              </div>
            )}
            {isSubmitted &&
              (user.fetching ? (
                <div className="flex justify-center items-center py-10 gap-3">
                  <div
                    className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span> Letting you in..</span>
                </div>
              ) : (
                iserror && (
                  <div className="mt-2 px-4 py-3 border border-red-500 bg-red-500/10 text-red-600 rounded-md shadow-sm animate-fade-in">
                    <p className="text-sm font-medium">{message}</p>
                  </div>
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
          <div className="flex items-center w-full my-5 ">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <GoogleSignIn />
        </div>
      </div>
    </>
  ) : (
    <Spinner />
  );
}
export default LoginPage;
