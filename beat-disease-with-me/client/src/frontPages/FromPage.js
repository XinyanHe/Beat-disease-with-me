import React, {Component} from "react";
import './FromPage.css'
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import profileImg from '../assets/profile.png';
import {login} from '../actions/user'
import {loginProf} from '../actions/profUser'
import "../App";

const DATA = require('../assets/userInfo.json')

class IncorrectInfo extends Component{

    render() {
        console.log(this.props)
        return (
            <p className='warning-fade'> {this.props.message}</p>)
    }
}

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.props.history.push("/login");
    }

    message = "";
    state = {userName: "", userPassword: "", authentication: false, showMessage: false}
    updateName = (event) => {
        this.setState({userName: event.target.value,});
    }
    updatePassword = (event) => {
        this.setState({userPassword: event.target.value});
    }
    adminAuthentic  = (username, password)  => {
    if (username === "admin"){
        if (password === "admin") {
            this.props.history.push('/adminPost');
            return true;
        } else{
            return false;
        }
    }


    return false;
}

    render() {
        const { app } = this.props;
    return (
        
        <div className="front-page">
        <div className="login-box">
            <img alt= 'profilePic' src={profileImg} className="LoginProfilePic" />
            <h1 className='Loginh1'>Login Here</h1>
            <p >User Name</p>
            <input type= "text" onChange={this.updateName} name = "" placeholder= "Enter User Name" />
            <p>Password</p>
            <input type= "password" onChange={this.updatePassword} name= "" placeholder= "Enter Password" />
            <button onClick={() => {
                const clickSound = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3')
                clickSound.play().then(r => console.log(r))
                login(this, app);
                loginProf(this,app);
                this.adminAuthentic(this.state.userName, this.state.userPassword);
                }}> Login </button>
            {!this.state.authentication && this.state.showMessage? (<IncorrectInfo message = {this.message}/>) : null}
            <h3> Don't have an account yet?</h3>
            <h3> <Link to= '/regRegister'>Create a regular account</Link></h3>
            <h3> <Link to= '/proRegister'>Create a professional account</Link></h3>
 
        </div>

    </div>)
    }
}

export default withRouter(LoginPage);