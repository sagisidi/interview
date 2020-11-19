
const userData ={
	isloggedIn:false,
	userid:'',
	token:null
}

 const UserDataReducer = (state = userData , action={}) =>{
	switch(action.type){
		case 'SIGN_OUT':
			return Object.assign({},state,{isloggedIn:false,userid:'',token:null});
		case 'SIGN_IN':
			return Object.assign({},state,{isloggedIn:true,userid:action.payload.userid,token:action.payload.token});
		default:
			return state;
	}

}

export default UserDataReducer;