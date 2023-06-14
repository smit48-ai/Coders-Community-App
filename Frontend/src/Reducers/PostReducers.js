
export const posts = (state=[],action) => {
    switch (action.type) {
      case 'FETCH_ALL':
          return [...action.payload];
      case 'CREATE':
          return [...state, action.payload];
      case 'LIKEPOST':
          return state.map((post)=>{
            if(post._id===action.payload._id){
                return action.payload;
            }
            else{
                return post;
            }
          })
      case 'UNLIKEPOST':
          return state.map((post)=>{
            if(post._id===action.payload._id){
                return action.payload;
            }
            else{
                return post;
            }
          })
      case 'SAVETHEPOST':
         return state.map((post)=>{
            if(post._id===action.payload._id){
                return action.payload;
            }
            else{
                return post;
            }
          })
      case 'UNSAVETHEPOST':
         return state.map((post)=>{
            if(post._id===action.payload._id){
                return action.payload;
            }
            else{
                return post;
            }
          })
      case 'DELETEPOST':
        return state.filter((post)=>post._id!==action.payload);
      case 'FETCHPOSTSBYSEARCH':
        return action.payload;
      default:
          return [...state]

    }
}
