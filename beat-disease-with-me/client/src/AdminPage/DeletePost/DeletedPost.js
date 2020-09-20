import React from 'react';
import {Link} from 'react-router-dom'
import AdminNavBar from '../AdminNavBar'
import { withRouter } from 'react-router-dom';

class DeletedPost extends React.Component {
  state = {
    post: this.props.location.state.post
  }

  render() {   
      return (
        <div>
          <AdminNavBar/>
        <div id='post'>
          {/* the profile picture of the author of the post */}
          <div id="bannerPost">
          {/* User can click on the profile picture to enter to the author's personal page */}
            <img className="bannerPicPost" src={ require('./doctor.JPEG') } alt=""
            />
          </div>
          {/* the name of the author */}
          <h2 id="postUser">{this.state.post.author}</h2>

          {/* the number of total likes */}
          <div className="totalLike">
              <i className="fa fa-heart" aria-hidden="true">{this.state.post.likes}</i>
          </div>    

          <div className='postTitleContainer'>
            <h1 id="postTitle">
              {this.state.post.title}
            </h1>
          </div>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>

          {/* the content of the post */}
          <div className='postContentContainer'>
            <h5 id="postContent">
              {this.state.post.body}
            </h5>
          </div>
        </div>
        </div>
      );
  }
}

export default withRouter(DeletedPost);
