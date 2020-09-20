import React, {Component} from 'react'
import './Register.css'
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { signUp } from "../actions/user";
import ImageForm from "./ImageForm";
// import { addImage } from "../actions/image";


class RegisterMessage extends Component{
    render() {
        return (
            <p className='warning-fade'> {this.props.message}</p>)
    }
}


class RegularRegister extends React.Component{
    message = "";
    state = {
        username:"",
        emailAddress:"",
        password:"",
        confirmPassword:"",
        selectedPic: null,
        successMessage: false,
        emptyUpload: false,
        inconsistPassword: false,
        missingInfo: false,
        uploaded: false,
        userType: "regular",
        message1: { type: "", body: "" },
        imageId: ""
    }

    handleInputChange = (event) => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: value
            }
        )
    }

    handlePicSelect = (event) => {
        event.preventDefault()
        this.setState({
            selectedPic: event.target.files[0]
        })
    }

    handleUploadPic = (event) => {
        event.preventDefault()
        if (this.state.selectedPic == null){
            this.message = "Please select an image first."
            this.setState({emptyUpload: true})
            setTimeout( () => {
                this.setState({emptyUpload: false})
            }, 3000)
        } else{
            this.message = "Upload Succeed!"
            this.setState({uploaded:true})
        }
    }

    handleRegister = (event) => {
        console.log("here")
        event.preventDefault()

        const clickSound = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3')
        clickSound.play().then(r => console.log(r))

        if (this.state.password === "" || this.state.username === "" || this.state.emailAddress === "" || this.state.imageId === ""){
            this.message = "Please fill in all fields required."
            this.setState({missingInfo:true})
            setTimeout( () => {
                this.setState({missingInfo: false})
            }, 3000)
        } else if (this.state.password !== this.state.confirmPassword){
            this.message = "Inconsistent Password! Please enter again."
            this.setState({inconsistPassword:true})
            setTimeout( () => {
                this.setState({inconsistPassword: false})
            }, 3000)
        } else{
            this.message = "Thank you for your registration!"
            if (this.state.imageId !== "") {
                signUp(this);
                console.log("success")
            }
            this.setState({successMessage:true})
            setTimeout( () => {
                this.setState({successMessage: false})
                }, 3000)
            setTimeout(() => {this.props.history.push('/')}, 3000)

        }
    }


    render() {
        return (
            <div className="RegisterBackground">
            <form className="RegRegisterForm" >
                <h4 className="Createh4">Join as a regular user</h4>
                <h2 className="Createh2">Create your account</h2>
                <div className="FormField">
                    <input className="FormInput"
                           value={this.state.username}
                           type="text"
                           name="username"
                           placeholder="Username"
                           onChange={this.handleInputChange}/>
                </div>
                <div className="FormField">
                    <input className="FormInput"
                           value={this.state.emailAddress}
                           type="text"
                           name="emailAddress"
                           placeholder="Email Address"
                           onChange={this.handleInputChange}/>
                </div>
                <div className="FormField">
                    <input className="FormInput"
                           value={this.state.password}
                           type="password"
                           name="password"
                           placeholder="Password"
                           onChange={this.handleInputChange}/>
                </div>
                <div className="FormField">
                    <input className="FormInput"
                           value={this.state.confirmPassword}
                           type="password"
                           name="confirmPassword"
                           placeholder="Confirmed Password"
                           onChange={this.handleInputChange}/>
                </div>
                <ImageForm dashboard={this} type="profile picture"/>
                <div className="FormField">
                    <button className="FormSubmit" type="button" id="registerButton" onClick={this.handleRegister}>
                        Register </button>
                </div>
                {this.state.inconsistPassword? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.missingInfo? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.successMessage? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.uploaded? (<RegisterMessage message = {this.message}/>) : null}
            </form>
            </div>
        )
    }
}

export default withRouter(RegularRegister)