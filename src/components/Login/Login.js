import React from 'react';
import './Login.css'
import {Redirect} from 'react-router-dom';
import {fetchApi} from '../../api/api';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            errors:[]
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
        if (!(!email || !password || !name)){
            const body = {name,email,password};
            fetchApi('login','POST',null,body)
            .then(userdata => {
                if(userdata && userdata.token){
                    this.setState({errors:[]})
                    window.sessionStorage.setItem('token',userdata.token);
                    this.props.updateUserData(userdata.userid,userdata.token)
                }
                else
                    this.setState({errors:userdata})
            })
            .catch(err => {
                console.log(err);
            })         
        }
        else
            this.setState({ errors: ['*All fields required'] })

    }

    validate = () => {
        const { email, password, name } = this.state;
        if (!email || !password || !name){
            this.setState({ errors: ['*All fields required'] })
            return false;
        }
        this.setState({ errors: [] })
        return true;
    }



    render() {
    const errorList = this.state.errors.map(error => 
                        <p className="error">{error}</p>)
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
                {errorList}
                <button className="submit" onClick={this.onsubmit}>Login</button>

            </div>
        }
        </React.Fragment>
        )
    }

}

export default Login;