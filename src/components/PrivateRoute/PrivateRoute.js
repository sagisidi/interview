import React from 'react';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({component:Component,isloggedIn:isloggedIn,...rest}) =>{
	
	return (
	<Route {...rest}  >
	{ isloggedIn?
		<Component {...rest}  />
		:
		<Redirect  to="/" />
	}
	</Route>

	)

}

export default PrivateRoute;
