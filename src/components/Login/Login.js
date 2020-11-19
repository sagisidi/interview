import React from 'react';
import './Login.css'
import {Redirect} from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            error:''
        }
    }

    onChangeName = (event) => {
        this.setState({ name: event.target.value }, () => {
            this.validate();
        })
    }
    onChangeEmail = (event) => {
        this.setState({ email: event.target.value }, () => {
            this.validate();
        })
        
    }
    onChangePassword = (event) => {
        this.setState({ password: event.target.value }, () => {
            this.validate();
        })
        
    }
    onsubmit = () => {
        const { name, email, password } = this.state;
        if (this.validate()){
               fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(userdata => {
                if(userdata && userdata.token){
                    this.setState({error:''})
                    window.sessionStorage.setItem('token',userdata.token);
                    this.props.signInOut({
                        userid:userdata.userid,
                        token:userdata.token
                    },
                    'SIGN_IN')  
                }
                else
                    this.setState({error:userdata})
            })
            .catch(err => {
                console.log(err);
            })         
        }

    }

    validate = () => {
        const { email, password, name } = this.state;
        if (!email || !password || !name){
            this.setState({ error: '*All fields required' })
            return false;
        }
        this.setState({ error: '' })
        return true;
    }



    render() {

        return (
        <React.Fragment>
        {this.props.isloggedIn?
            <Redirect to="profile"/>
            :
            <div className="form-container">
                <h2>Login Form</h2>
                <span>
                    <label>Name:</label>
                    <input onChange={this.onChangeName}  type="text" id="nameField"/>                   
                </span>
                <span>
                    <label>Email:</label>
                    <input onChange={this.onChangeEmail}  type="text" id="emailField"/>                   
                </span>
                <span>
                    <label>Password:</label>
                    <input onChange={this.onChangePassword}  type="password" id="passField"/>                   
                </span>
                <p className="error">{this.state.error}</p>
                <button className="submit" onClick={this.onsubmit}>Login</button>

            </div>
        }
        </React.Fragment>
        )
    }

}

export default Login;