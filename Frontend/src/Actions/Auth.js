import * as api from "../API/auth.js"


export const register = function (formdata){
    return async(dispatch)=>{
    try{
        const result = await api.signup(formdata);
        dispatch({type:'REGISTER', payload:result.data});
    } 
    catch(err){
        console.log(err);
        dispatch({type:'SIGNUPFALIURE', payload:""})
    }
  }
}  

export const login = function (formdata){
    return async(dispatch)=>{
    try{
        const result = await api.login(formdata);
        dispatch({type:'LOGIN', payload:result.data});   
    } 
    catch(err){
        dispatch({type:'LOGINFALIURE', payload:""})
        console.log(err);
    }
  }
} 

export const logout = function (){
    return async(dispatch)=>{
    try{
        dispatch({type:'LOGOUT', payload:{}});
    } 
    catch(err){
        console.log(err);
    }
  }
} 

export const Emailverified = function(id,token){
    return async(dispatch)=>{
        try{
            await api.verify(id,token);
            dispatch({type:"EMAILVERIFIED", payload:{}});
        }
        catch(err){
            console.log(err);
        }
    }
}