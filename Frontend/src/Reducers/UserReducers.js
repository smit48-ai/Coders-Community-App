const InitialUserState={
    userdata:null,
    isLoggedin:false,
    fetching:true,
    Topusers:[],
    errors:null
}

export const User = (state=InitialUserState,action) => {
    switch (action.type) {
      case 'STARTEDFETCHINGUSER':
        return {...state, fetching:true, errors:null};
      case 'ENDEDFETCHINGUSER':
        return {...state, fetching:false, errors:null};
      case 'REGISTER':
          localStorage.setItem('profile', action?.payload.token);
          return {...state, userdata:action.payload.user, fetching:false, errors:null};
      case 'LOGIN':
          localStorage.setItem('profile', action?.payload.token);
          return {...state, userdata:action.payload.user, fetching:false, errors:null};
      case 'LOGOUT':
          localStorage.clear();
          return {...state, fetching:true};
      case 'GETUSER':
          return {...state, userdata:action.payload, fetching:false, errors:null};
      case 'LOGINFALIURE':
          return {...state, fetching:false, errors:401}
      case 'SIGNUPFALIURE':
          return {...state, fetching:false, errors:401}
      case 'UPDATEPROFILEIMG':
          return {...state, userdata:{...state.userdata, ProfilePicture:action.payload}}
      case 'UPDATECOVERIMG':
            return {...state, userdata:{...state.userdata, CoverPicture:action.payload}}
      case 'UPDATEBIO':
            return {...state, userdata:{...state.userdata, ...action.payload}}
      case 'EMAILVERIFIED':
            return {...state, userdata:{...state.userdata, isEmailVerified:true}}
      case 'TOPFOLLOWED':
            return {...state, userdata:{...state.userdata, isEmailVerified:true}, Topusers:action.payload}
      case 'FOLLOW':
            return {...state, userdata:{...state.userdata, Following:[...state.userdata.Following, action.payload]}}
      case "UNFOLLOW":
            const newFollowing=state.userdata.Following.filter((x)=>x!==action.payload);
            return {...state, userdata:{...state.userdata, Following:newFollowing}}
      default:
          return {...state};
    }
}
