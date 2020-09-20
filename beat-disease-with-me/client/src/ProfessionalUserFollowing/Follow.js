import React from 'react';
import './Follow.css';
import UserNavBar from '../UserNavBar'
import { withRouter } from 'react-router-dom';
import { getProfUser, updateProf } from "../actions/profUser";
import { updateUser } from "../actions/user";

class Follow extends React.Component {

  state = {
    // name, profile picture, description of relative experience and certificate
    // are all hardcoded here, needed to be get from database in phase 2.
    sourcePicture: require('./doctor.JPEG'),
    certificate: require('./certificate.JPEG'),
    userObj: null,
    follow: false
  }

  follow = (user) => {
    this.setState({
      follow: true
    })
    if (this.state.userObj !== null) {
      this.state.userObj.follower.push(user._id)
      updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      user.following.push(this.state.userObj._id)  
      updateUser(user._id, user.following, user.username, user.emailAddress, user.password, user.likes, user.dislikes, user.imageId)
    }
  }

  unfollow = (user) => {
    this.setState({
      follow: false
    })
    if (this.state.userObj !== null) {
      const index = this.state.userObj.follower.indexOf(user._id);
      if (index > -1) {
        this.state.userObj.follower.splice(index, 1);
      }
      updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)
      const index2 = user.following.indexOf(this.state.userObj._id);
      if (index2 > -1) {
        user.following.splice(index2, 1);
        updateUser(user._id, user.following, user.username. user.emailAddress, user.password, user.likes, user.dislikes, user.imageId)
      }
    }
  }

  componentDidMount(){ 
    const {app} = this.props;
    const curr_user = app.state.currentUser;
    getProfUser(this, this.props.location.state.authorId)
    if (curr_user.following.includes(this.props.location.state.authorId)) {
        this.setState({
          follow: true
        })
    }
  }

	renderSwitch(type, user) {
    switch(type) {
        case "regular":
            return (
                <div id="wrapper">
                {(this.state.follow) ? (<button id="unfollow" onClick={() => this.unfollow(user)}>Unfollow</button>) : (<button id="follow" onClick={() => this.follow(user)}>Follow</button> ) }
                </div>
            );
        default:
            return (
                <div></div>
            );
    }
  }

  render() {
    const {app} = this.props;
    const curr_user = app.state.currentUser;
      return (
        <div>
          {console.log(this.state.follow)}
          <UserNavBar app = {app}/>
          
          {/* profile picture of the user */}
          <div id="banner">
              {(this.state.userObj !== null) ? <div>
                  <img className="bannerPic" src={ this.state.userObj.imageId } alt=""/>
                  <h1 id="followName">{this.state.userObj.username}</h1>
              </div> : null}
          </div>

          {/* name of the user */}
          {/*<div>*/}
          {/*<h1 id="followName">{(this.state.userObj !== null) ? this.state.userObj.username : null}</h1>*/}
          {/*</div>*/}
          {this.renderSwitch(curr_user.userType, curr_user)}

          {/* discription of relative experience */}
          <div className='description'>
            <h3 id="followDescription">
              {(this.state.userObj !== null) ? this.state.userObj.description : null}
            </h3>
          </div>

          {/* certificate of this professional user */}
          <div className='followingCertificate'>
            {(this.state.userObj !== null) ? <img id="followingCertificatePic" src={ this.state.userObj.certificateId } alt=""/> : null}
          </div>
        </div>
      );
  }
}

export default withRouter(Follow);
