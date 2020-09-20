import React from 'react';
import './Following.css';
import {uid} from 'react-uid';
import { withRouter } from 'react-router-dom';
import { getProfUserName } from "../../actions/profUser";
import { getUserName, updateUser } from "../../actions/user";

class Following extends React.Component {

  state = {
    followingList: []
  }

  componentDidMount(){ 
    const {app} = this.props;
    const curr_user = app.state.currentUser;
    if (curr_user.userType === 'regular') {
      const following = curr_user.following
      let i 
      for (i = 0; i < following.length; i++) {
        getProfUserName(this, following[i])
      }
    } else {
      const follower = curr_user.follower
      let j
      for (j = 0; j < follower.length; j++) {
        getUserName(this, follower[j])
      }
    }
  }
  // regular user can unfollow users in this page, professional user can only
  // all followers, but cannot remove these followers
  renderSwitch(usertype, curr_user) {
  	switch(usertype) {
  		case 'regular':
  			return (
          <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
          <table>
            <tbody>
              <tr>
                <th>
                  User Name
                </th>
                <th>
                  unfollow
                </th>
              </tr>

              {this.state.followingList.map((following) => {
                return(
                  <tr key={uid(following)}>
                    <td>
                      {following.username}
                    </td>
                    <td>
                      {/* button to unfollow the user */}
                      <div className="trash"
                        onClick={
                          () => this.unfollow(following, curr_user)}>
                          <i className="fa fa-user-times fa-2x like" aria-hidden="true"/>
                      </div>                         
                    </td>
                  </tr>                       
                )
              })}

            </tbody>
        </table>
        </div>
      		);
  		default:
  			return (
          <div>
          <table>
            <tbody>
              <tr>
                <th>
                  User Name
                </th>
              </tr>

              {this.state.followingList.map((following) => {
                return(
                  <tr key={uid(following)}>
                    <td>
                      {following.username}
                    </td>
                  </tr>                       
                )
              })}

            </tbody>
        </table>
        </div>
      		);
  	}
  }

  unfollow= (following, curr_user) => {
      const filteredFollowing = this.state.followingList.filter((s) => {
        return s !== following
      })
      this.setState({
        followingList: filteredFollowing
      })
      console.log(curr_user)
      const index = curr_user.following.indexOf(following.id);
      if (index > -1) {
        curr_user.following.splice(index, 1);
        updateUser(curr_user._id, curr_user.following, curr_user.username, curr_user.emailAddress, curr_user.password, curr_user.likes, curr_user.dislikes, curr_user.imageId)
      }
  }

  render() {

    const {app} = this.props;
    const curr_user = app.state.currentUser; 

        return(
            <div className="tableContent">
              {this.renderSwitch(curr_user.userType, curr_user)}
            </div>
        );
    }
}

export default withRouter(Following);