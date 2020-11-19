import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

function Header({isloggedIn}) {
  return (
    <div className="Header">
    	{!isloggedIn && 
    		<li><Link to="/login">Login</Link></li>
    	}
    	{!isloggedIn && 
    		<li><Link to="/register">Register</Link></li>
    	}        	
    	

        {isloggedIn && <li><Link to="/profile">Profile</Link></li>}
    </div>
  );
}

export default Header;
