import React, {Component} from 'react'
import axios from 'axios';
import './Register.css'
import { withRouter } from 'react-router-dom';
import {signUp} from "../actions/profUser";
import ImageForm from "./ImageForm";

class RegisterMessage extends Component{
    render() {
        return (
            <p className='warning-fade'> {this.props.message}</p>)
    }
}

class ProfessionalRegister extends React.Component{
    message = "";
    state = {
        username:"",
        emailAddress:"",
        password:"",
        confirmPassword:"",
        description:"",
        files: [],
        successMessage: false,
        inconsistPassword: false,
        missingFile: false,
        missingInfo: false,
        uploaded: false,
        userType: "professional",
        imageId: "",
        certificateId: "",
        message1: { type: "", body: "" },
        message2: { type: "", body: "" }
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

    handleSelect = (event) => {
        event.preventDefault()
        let new_array = this.state.files
        for (let j = 0; j < (event.target.files).length; j++) {
            new_array.push(event.target.files[j])
        }
        this.setState({
            files : new_array
        })
    }

    handleUpload = (event) => {
        event.preventDefault()
        if ((this.state.files).length < 2){
            this.message = "You have not upload enough files."
            this.setState({missingFile:true})
            setTimeout(() => {
                this.setState({missingFile: false})
            }, 3000)
        } else{
            {/* Should send all images to the database here, I will complete this part in pharse 2 */}
            // for (let i = 0; i < (this.state.files).length; i++) {
            //     const formData = new FormData;
            //     formData.append(`images[${i}]`, this.state.files[i], this.state.files[i].name)
            //     axios.post('', formData, {
            //         onUploadProgress: progressEvent => {
            //             console.log('upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
            //         }
            //     })
            //         .then(res => {
            //             console.log(res)
            //         })
            // }
            this.message = "Upload Succeed!"
            this.setState({uploaded:true})
        }
    }

    handleProfRegister = (event) => {
        event.preventDefault()
        const clickSound = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3')
        clickSound.play().then(r => console.log(r))
        if (this.state.password === "" || this.state.username === "" || this.state.emailAddress === ""
            || this.state.description === ""){
            this.message = "Please fill in all fields required."
            this.setState({missingInfo:true})
            setTimeout( () => {
                this.setState({missingInfo: false})
            }, 3000)
        } else if (this.state.password !== this.state.confirmPassword){
            this.message = "Inconsistant Password! Please enter again."
            this.setState({inconsistPassword:true})
            setTimeout( () => {
                this.setState({inconsistPassword: false})
            }, 3000)
        } else{
            this.message = "Thank you for your registration!"
            signUp(this);
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
            <form className="ProRegisterForm">
                <h4 className="Createh4">Join as a professional user</h4>
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
                {/* <div className="FormField">
                    <input type="file" className="hiddenButton" multiple onChange={this.handleSelect}
                           ref={PicInput => this.fileInput = PicInput}/>
                    <button className="selectCert"
                            type="button"
                            onClick={() => this.fileInput.click()}> Select your profile picture and certificates </button>
                    <button type="button" onClick={this.handleUpload}> upload </button> */}
                    {/*<input type="file" className="hiddenButton" onChange={this.handleCertSelect}*/}
                    {/*       ref={CertInput => this.fileInput = CertInput}/>*/}
                    {/*<button className="selectCert" onClick={() => this.fileInput.click()}> Select the certificate from your computer </button>*/}
                    {/*<button onClick={this.handleUploadCert}> Upload </button>*/}
                {/* </div> */}
                <ImageForm dashboard={this} type="profile picture"/>
                <ImageForm dashboard={this} type="certificate"/>
                <div className="FormField">
                    <textarea className="FormTextarea"
                              value={this.state.description}
                              name="description"
                              placeholder="Describe about your related experience"
                              onChange={this.handleInputChange}>
                    </textarea>
                </div>
                <div className="FormField">
                    <button className="FormSubmit" type="button" id="registerButton" onClick={this.handleProfRegister}>
                         Register </button>
                </div>
                {this.state.successMessage? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.inconsistPassword? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.missingInfo? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.missingFile? (<RegisterMessage message = {this.message}/>) : null}
                {this.state.uploaded? (<RegisterMessage message = {this.message}/>) : null}
            </form>
            </div>
        )
    }
}

export default withRouter(ProfessionalRegister)