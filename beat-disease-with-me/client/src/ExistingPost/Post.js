import React from 'react';
import {Link} from 'react-router-dom'
import {uid} from 'react-uid'
import './Post.css';
import UserNavBar from '../UserNavBar'
import { withRouter } from 'react-router-dom';
import { updatePost, addCommenttoPost } from "../actions/post";
import { updateUser } from "../actions/user";
import { updateProf } from "../actions/profUser";

class Post extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
}

  state = {
    
    post: this.props.location.state.post,
    // whether the pop up comment page is pop up
    likes: this.props.location.state.post.likes,
    // post title, post author, post content, the number of likes, all the comments of the current post, all the authors' names and profile 
    // pictures, and the name and profile pictures of the current user are all hardcoded here, and in phase 2, it will be get
    // from the database.s
    commenter: null,
    content: "",
    comments: this.props.location.state.post.comments,
    userObj: null,
    comment: 0,
    like: false,
    dislike: false,
    imageId: ""
  }

  componentDidMount(){ 
    const {app} = this.props;
		const curr_user = app.state.currentUser;
    this.setState({userObj: curr_user})
    if (curr_user.likes.includes(this.props.location.state.post._id)) {
      this.setState({
        like: true
      })
    }
    if (curr_user.dislikes.includes(this.props.location.state.post._id)) {
      this.setState({
        dislike: true
      })
    }   
  }

  addLikes = () => {
    const currLikes = this.state.likes + 1
    this.setState({
      likes: currLikes,
      like: true
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      this.state.userObj.likes.push(this.state.post._id)
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  cancelLikes = () => {
    const currLikes = this.state.likes - 1
    this.setState({
      likes: currLikes,
      like: false
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      const index = this.state.userObj.likes.indexOf(this.state.post._id);
      if (index > -1) {
        this.state.userObj.likes.splice(index, 1);
      }
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  addDislikes = () => {
    const currLikes = (this.state.likes >= 1) ? (this.state.likes - 1) : this.state.likes
    this.setState({
      likes: currLikes,
      dislike: true
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      this.state.userObj.dislikes.push(this.state.post._id)
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  cancelDislikes = () => {
    const currLikes = this.state.likes + 1
    this.setState({
      likes: currLikes,
      dislike: false
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      const index = this.state.userObj.dislikes.indexOf(this.state.post._id);
      if (index > -1) {
        this.state.userObj.dislikes.splice(index, 1);
      }
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  dislikeLiked = () => {
    const currLikes = (this.state.likes >= 2) ? (this.state.likes - 2) : 0
    this.setState({
      likes: currLikes,
      like: false,
      dislike: true
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      const index = this.state.userObj.likes.indexOf(this.state.post._id);
      if (index > -1) {
        this.state.userObj.likes.splice(index, 1);
      }
      this.state.userObj.dislikes.push(this.state.post._id)
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  likeDisliked = () => {
    const currLikes = (this.state.likes === 0 && this.state.dislike) ? 1 : this.state.likes + 2
    this.setState({
      likes: currLikes,
      like: true,
      dislike: false
    })
    updatePost(this.state.post._id, currLikes)
    if (this.state.userObj !== null) {
      const index = this.state.userObj.dislikes.indexOf(this.state.post._id);
      if (index > -1) {
        this.state.userObj.dislikes.splice(index, 1);
      }
      this.state.userObj.likes.push(this.state.post._id)
      if (this.state.userObj.userType === "regular") {
        updateUser(this.state.userObj._id, this.state.userObj.following, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.likes, this.state.userObj.dislikes)  
      } else {
        updateProf(this.state.userObj._id, this.state.userObj.status, this.state.userObj.onPage, this.state.userObj.follower, this.state.userObj.username, this.state.userObj.emailAddress, this.state.userObj.password, this.state.userObj.description, this.state.userObj.likes, this.state.userObj.dislikes, this.state.userObj.imageId)  
      }
    }
  }

  addComment = () => {
    if (this.state.content !== "") {
      const commentList = this.state.comments
      const comment = {
        commenter: this.state.userObj.username,
        content: this.state.content,
        imageId: this.state.userObj.imageId
      }
      commentList.push(comment)
      this.setState({
        comments: commentList,
        comment: 1
      })
      addCommenttoPost(this.state.post._id, this.state.userObj.username, this.state.content, this.state.userObj.imageId)
      setTimeout(() => {
        this.setState({comment: 0})
      }, 1500)
    } else {
      this.setState({comment: 2})
      setTimeout(() => {
        this.setState({comment: 0})
      }, 1500)
    }
  }

  handleInputChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }


  render() {  

      const {app} = this.props;
      console.log(app);
      const curr_user = app.state.currentUser;

      return (
        <div>
          <UserNavBar app = {app}/>
        <div id='post'>
          {/* the profile picture of the author of the post */}
          <div id="bannerPost">
          {/* User can click on the profile picture to enter to the author's personal page */}
          {(this.state.post.authorType === 'regular' || curr_user.userType === 'professional') ? (
            <img className="bannerPicPost" src={ this.state.post.imageId } alt=""/>
          ) : (<Link to={{pathname: "/follow/" + this.state.post.authorId, state: {authorId: this.state.post.authorId}}}>
            <img className="bannerPicPost" src={ this.state.post.imageId } alt=""
            />
          </Link>)}
          </div>
          {/* the name of the author */}
          <div id="postUser">{this.state.post.author}</div>

          {/* the number of total likes */}
          <div className="totalLike">
              <i className="fa fa-heart" aria-hidden="true">{this.state.likes}</i>
          </div>
          
          {/* neither liked nor disliked */}
          {(!this.state.like && !this.state.dislike) ? (<div className="like" onClick={this.addLikes}>
              <i className="fa fa-sort-asc fa-3x like" aria-hidden="true"></i>
          </div>) : null }

          {(!this.state.like && !this.state.dislike) ? (<div className="dislike" onClick={this.addDislikes}>
              <i className="fa fa-sort-desc fa-3x like" aria-hidden="true"></i>
          </div>) : null }

          {/* liked */}
          {(this.state.like && !this.state.dislike) ? (<div className="liked">
              <i className="fa fa-sort-asc fa-3x liked" aria-hidden="true"></i>
          </div>) : null }

          {(this.state.like && !this.state.dislike) ? (<div className="dislike">
              <i className="fa fa-sort-desc fa-3x like" aria-hidden="true" onClick={() => {this.dislikeLiked()}}></i>
          </div>) : null }
          
          {/* disliked */}
          {(!this.state.like && this.state.dislike) ? (<div className="like">
              <i className="fa fa-sort-asc fa-3x like" aria-hidden="true" onClick={() => {this.likeDisliked()}}></i>
          </div>) : null }

          {(!this.state.like && this.state.dislike) ? (<div className="disliked">
              <i className="fa fa-sort-desc fa-3x like" aria-hidden="true"></i>
          </div>) : null }     

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

          {/* the tag and location of the post */}
          <div id='tagContainer'>
            <h5 className="hashtag">
              #{this.state.post.tag}  #{this.state.post.location}
            </h5>
          </div>
        
          </div>
          <div className="blank1">
          </div>

      <h2 id="commentNum">{this.state.comments.length} comments</h2>

        {/* all comments, hardcodes here, needed to get from database */}
        {this.state.comments.map((comment) => {
        return(
          <div key={uid(comment)}>
          <div className='realComment'>
          <div className='commentIconContainer'>
            <img className="commentIcon" src={ comment.imageId } alt=""/>
            <h2 className="commentUser">{comment.commenter}</h2>
          </div>


          <div className='commentContent'>
            <p className='commentText'>
              {comment.content}
            </p>
          </div>
        </div>
        </div>
        )
        })}
        <div className="yourComment">
            <div className="yourCommentContent">
              <form>
                <h3 id='addComment'>Your Comment</h3>
                <textarea name="message" value={this.state.content} 
                onChange={this.handleInputChange} rows="15" cols="100"></textarea>
                <br/>
                <br/>
                <button id="summitButton" type= "button" onClick={this.addComment}>Summit</button>
              </form>
            </div>
            {(this.state.comment === 1) ? (<div id="success"><div class="alert2 alert-success">
            <strong>SUCCESS!</strong> You have added a comment!
            </div></div>) : null}
            {(this.state.comment === 2) ? (<div id="success"><div class="alert2 alert-danger">
    			  <strong>Fail!</strong> Comment is empty!
  			    </div></div>) : null}
            <div className="blank2">
            </div>
          </div>
        </div>
      );
  }
}

export default withRouter(Post);
