import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from 'react-redux';

import App from './App';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {signInOutAction} from './actions/action';


const mapStateToProps= (state) =>{
  return {
    isloggedIn: state.UserDataReducer.isloggedIn,
    userid:state.UserDataReducer.userId,
    token:state.UserDataReducer.token
  }
}

const mapDispatchToProps = (dispatch) => {
  
    return {
      signInOut: (data,type) => dispatch(signInOutAction(data,type)),
    }
}

class Routes extends React.Component{


   componentDidMount(){
      const token = window.sessionStorage.getItem('token')
      if(token)
        fetch('http://localhost:8080/login', {
            method: 'get',
            headers: { 
              'Content-type': 'application/json',
              'Authorization': token
            }
        })
        .then(response => response.json())
        .then(user=>{
          user.userid?
          this.props.signInOut(
              {userid:user.userid,token:token},
              'SIGN_IN'
          )
          :
          this.props.signInOut(false,'SIGN_OUT')  
        })
        .catch(err => console.log(err))

    }

  render(){
    return (
   
      <Router>

            <Header isloggedIn={this.props.isloggedIn} />
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <PrivateRoute path='/profile' component={Profile} 
                      isloggedIn={this.props.isloggedIn} token={this.props.token}/>

            <Route exact path='/login'
              render={(routeProps) => (
                <Login 
                  {...routeProps}
                  signInOut={this.props.signInOut} 
                  isloggedIn={this.props.isloggedIn}
                />

                )
              }
            />
            <Route exact path='/register'
              render={(routeProps) => (
                <Register 
                  {...routeProps}
                  signInOut={this.props.signInOut} 
                  isloggedIn={this.props.isloggedIn}
                />

                )
              }
            />     
          </Switch>
      </Router>
    );    
  }

}

export default connect(mapStateToProps,mapDispatchToProps) (Routes);