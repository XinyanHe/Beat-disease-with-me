import React, {Component} from 'react';
import Following from "./Following/Following";
import InformationPageEdit from "./Information/InformationPageEdit";
import InfomationPage from "./Information/InfomationPage";

import AccountPost from "./Posts/AccountPagePost";
import "./AccountMainPage.css"
import { withRouter } from 'react-router-dom';
import { getUser, updateUser } from "../actions/user";
import { updateProf } from "../actions/profUser";
import { resolve } from 'path';
import { rejects } from 'assert';
const bcrypt = require('bcryptjs')

class AccountMainPage extends Component {

    constructor(props) {
        super(props);
    }

    getInitalUserInfo = ()=> {
        const {app} = this.props;
        const curr_user = app.state.currentUser;


        if(curr_user.userType === "regular"){
            return {
                id: curr_user._id,
                following: curr_user.following,
                username: curr_user.username,
                real_password: curr_user.password, 
                password_shown: '******',
                emailAddress: curr_user.emailAddress,
                profilePic: null,
                userType: curr_user.userType,
                imageId: curr_user.imageId,
                likes: curr_user.likes,
                dislikes: curr_user.dislikes,
                imageId: curr_user.imageId
            }
        }
        else if(curr_user.userType === "professional"){
            console.log(curr_user)
            return {
            id: curr_user._id,
            follower: curr_user.follower,
            username: curr_user.username, 
            real_password: curr_user.password, 
            password_shown: '******',
            emailAddress: curr_user.emailAddress,
            profilePic: null,
            description: curr_user.description,
            userType: curr_user.userType,
            status: curr_user.status,
            onPage: curr_user.onPage,
            likes: curr_user.likes,
            dislikes: curr_user.dislikes,
            imageId: curr_user.imageId
            }
        }
        else {
            console.log("Can't identify the userType");
        }
    }
    state = {
        Component: InfomationPage,
        activate: "InfomationPage",
        InfomationPageInfo:this.getInitalUserInfo(),
        hashed: false,
        success: false
    }

    updateApp = (app,newUserInfo) => {
        app.state.currentUser.username = newUserInfo.username;
        app.state.currentUser.emailAddress = newUserInfo.emailAddress;

        app.state.currentUser.password = newUserInfo.real_password;
        app.state.currentUser.imageId = newUserInfo.imageId;
    }

    editOnClick = () => {
        this.setState({Component: InformationPageEdit, activate: "InformationPageEdit"})
    }

    //Hash the password user passed in
    hash = (newUserInfo) => {
        return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUserInfo.real_password, salt, (err, hash) => {
                    newUserInfo.real_password = hash
                    resolve();
                })
            })
		})
    }

    submitOnClick = async() => {
        const {app} = this.props;
        let newUserInfo = this.state.InfomationPageInfo;

        this.setState({Component: InfomationPage, activate: "InfomationPage"})
        //Update the password
        if(newUserInfo.userType === 'regular') {
            if(app.state.currentUser.password !== newUserInfo.real_password){
                console.log(newUserInfo.real_password)
                this.hash(newUserInfo).then(() => {
                        console.log(newUserInfo.imageId)
                        updateUser(newUserInfo.id, newUserInfo.following, newUserInfo.username, newUserInfo.emailAddress, newUserInfo.real_password, newUserInfo.likes, newUserInfo.dislikes, newUserInfo.imageId);
                        console.log(newUserInfo.password);
                    }
                )
            }else{
                updateUser(newUserInfo.id, newUserInfo.following, newUserInfo.username, newUserInfo.emailAddress, newUserInfo.real_password, newUserInfo.likes, newUserInfo.dislikes, newUserInfo.imageId); 
            }
        } else {
            if(app.state.currentUser.password !== newUserInfo.real_password){
                console.log(newUserInfo.real_password)
                this.hash(newUserInfo).then(() => {
                    updateProf(newUserInfo.id, newUserInfo.status, newUserInfo.onPage, newUserInfo.follower, newUserInfo.username, newUserInfo.emailAddress, newUserInfo.real_password, newUserInfo.description, newUserInfo.likes, newUserInfo.dislikes, newUserInfo.imageId)
                    console.log(newUserInfo.real_password);
                    }
                )
            } else{
                updateProf(newUserInfo.id, newUserInfo.status, newUserInfo.onPage, newUserInfo.follower, newUserInfo.username, newUserInfo.emailAddress, newUserInfo.real_password, newUserInfo.description, newUserInfo.likes, newUserInfo.dislikes, newUserInfo.imageId)
            }          
        }
        this.updateApp(app,newUserInfo);
    }
    handleNameChange = (e) => {
        let newUserInfo = this.state.InfomationPageInfo;
        console.log(this.state.InfomationPageInfo)
        newUserInfo.username = e.target.value
        this.setState({InfomationPageInfo: newUserInfo})
    }
    handlePassworkchange = (e) => {
        let newUserInfo = this.state.InfomationPageInfo;
        newUserInfo.password_shown = e.target.value
        newUserInfo.real_password = e.target.value
        this.setState({InfomationPageInfo: newUserInfo})
    }
    handleEmailChange = (e) => {
        let newUserInfo = this.state.InfomationPageInfo;
        newUserInfo.emailAddress = e.target.value
        this.setState({InfomationPageInfo: newUserInfo})
    }
    handleDescrptionChange = (e) => {
        let newUserInfo = this.state.InfomationPageInfo;
        newUserInfo.description = e.target.value
        this.setState({InfomationPageInfo: newUserInfo})
    }
    CapEditFuncs = (action) => {
    switch (action) {
        case "username":
            return this.handleNameChange;
        case "password":
            return this.handlePassworkchange;
        case "emailAddress":
            return this.handleEmailChange;
        case "description":
            return this.handleDescrptionChange
    }
    }

    getCorrectComponent = () => {
        const {app} = this.props;

        switch (this.state.activate) {
            case "InformationPageEdit":
                return (<InformationPageEdit app = {app} funcs = {this.CapEditFuncs} info = {this.state.InfomationPageInfo} submit = {this.submitOnClick}/>)
            case "InfomationPage":
                console.log("InfomationPage", this.state.InfomationPageInfo)
                return (<InfomationPage  app = {app} edit = {this.editOnClick} info = {this.state.InfomationPageInfo} />)
            case "AccountPost":
                return (<AccountPost app = {app}/>)
            case "Following":
                return (<Following app = {app}/>)
            default:
                return (<InfomationPage  app = {app} edit = {this.editOnClick} info = {this.state.InfomationPageInfo} />)
        }
    }

    renderSwitch(){
        const {app} = this.props;
        const curr_user = app.state.currentUser;

        switch(curr_user.userType) {
            case 'regular':
                return (
                    <li>
                    <button onClick={() => {
                        this.setState({Component: Following, activate: "Following"})
                    }} className={"switchButton" + this.getActivate("Following")}>Following
                    </button>
                </li>
                );
            default:
                return (
                    <li>
                    <button onClick={() => {
                        this.setState({Component: Following, activate: "Following"})
                    }} className={"switchButton" + this.getActivate("Following")}>Follower
                    </button>
                </li>
                );
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.state.activate !== this.props.activate){
            console.log("receive state")
        this.setState({
            Component: nextProps.Component,
            activate: nextProps.Active
        })}
    }
    componentDidMount() {
        this.setState({
            Component: this.props.Component,
            activate: this.props.Active
        })
    }

    getActivate = (className) => {
        if (className === this.state.activate) {
            return " active"
        } else {
            return ""
        }
    }

    render() {

        const {app} = this.props;
        const curr_user = app.state.currentUser;

            return (
                <div>
                    <div id="switchBlock">
                        <ul id="navigation">
                            <li>
                                <button onClick={() => {
                                    this.setState({Component: InformationPageEdit, activate: "InfomationPage"})
                                }} className={"switchButton" + this.getActivate("InfomationPage")}>Personal Info
                                </button>
                            </li>
                            {/*<li><h2 onClick={() => {this.setState({Component:InformationPage})}} className= "switchButton">Personal Info</h2></li>*/}
                            <li>
                                <button onClick={() => {
                                    this.setState({Component: AccountPost, activate: "AccountPost"})
                                }} className={"switchButton" + this.getActivate("AccountPost")}>Post History
                                </button>
                            </li>
                            {this.renderSwitch()}
                        </ul>
                    </div>
                    <div id="stateComponent">
                        {this.getCorrectComponent()}
                    </div>
                </div>
            )
        }
    }


export default withRouter(AccountMainPage);