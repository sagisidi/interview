import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {fetchApi} from './api/api';

class Routes extends React.Component{

  constructor(props){
    super(props);
    this.updateUserData = this.updateUserData.bind(this);
    this.state = {
      isloggedIn:false,
      userid:'',
      token:null
    }

  }
   componentDidMount(){
      const token = window.sessionStorage.getItem('token')
      if(token)
        fetchApi('login','GET',token,null)
        .then(user=>{
            this.updateUserData(user.userid,token)
        })
        .catch(err => console.log(err))

    }

  updateUserData(userid,token){
    if(userid && token){
      this.setState({isloggedIn:true,userid:userid,token:token})
    }
    else
      this.setState({isloggedIn:false,userid:'',token:null})
  };

  render(){
    return (
   
      <Router>

          <Header isloggedIn={this.state.isloggedIn} />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>

            <PrivateRoute path='/profile' component={Profile} 
                      isloggedIn={this.state.isloggedIn} token={this.state.token}/>

            <Route exact path='/login'>
                <Login 
                  updateUserData={this.updateUserData} 
                  isloggedIn={this.state.isloggedIn}
                />
            </Route>
            <Route exact path='/register'>
                <Register 
                  updateUserData={this.updateUserData} 
                  isloggedIn={this.state.isloggedIn}
                />
            </Route>   
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
      </Router>
    );    
  }

}

export default Routes;