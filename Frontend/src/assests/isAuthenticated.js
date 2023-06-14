import jwtDecode from 'jwt-decode';

export default function isAuthenticated(){
    const token=localStorage.getItem("profile");
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp*1000<new Date().getTime()){
          localStorage.clear();
          return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }
