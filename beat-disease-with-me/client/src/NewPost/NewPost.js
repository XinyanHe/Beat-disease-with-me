import React from 'react'
import DatePicker from 'react-date-picker';
import './NewPost.css';
import UserNavBar from '../UserNavBar'
import { withRouter } from 'react-router-dom';
import { addPost } from "../actions/post";

class NewPost extends React.Component {

	constructor(props) {
        super(props);
        this.props.history.push("/newpost");
	}
	
  state = {
	success: 0,
  	title: '',
  	body: '',
	tag: '',
    location: '',
	date: new Date(),
	userObj: null,
	newPost: null
  }

  componentDidMount(){ 
		const {app} = this.props;
		const curr_user = app.state.currentUser;
		this.setState({userObj: curr_user})
	}

  onChange = date => this.setState({ date })

  post = () => {
	if ((this.state.title !== '') && (this.state.body !== '')) {
		if (this.state.tag === '') {
			this.setState({tag: "Lockdown Policy Updates"})
		}
		if (this.state.location === '') {
			this.setState({location: "Canada"})
		}
		this.setState({success: 1})
		addPost(this)
		setTimeout(() => {
			this.props.history.push({pathname: '/post', state: {post: this.state.newPost}})
		}, 1500)
	}
	else if ((this.state.title === '') && (this.state.body !== '')) {
		this.setState({success: 2})
		setTimeout(() => {
			this.setState({success: 0})
		}, 1500)
	}
	else if ((this.state.title === '') && (this.state.body === '')) {
		this.setState({success: 3})
		setTimeout(() => {
			this.setState({success: 0})
		}, 1500)
	}
	else if ((this.state.title !== '') && (this.state.body === '')) {
		this.setState({success: 4})
		setTimeout(() => {
			this.setState({success: 0})
		}, 1500)
	}
  }

  // Record all changes from textarea and select bar
  handleChange = (event) => {
  	const target = event.target
  	const value = target.value
  	const name = target.name
    this.setState({[name]: value});
  }

	render() {

		const {app} = this.props;
		const user = app.state.currentUser;

	    return (
	    	<div>
			{/* navigation bar at the top */}
	    	<UserNavBar app = {app}/>

			{/* textarea for post title and post body*/}
	    	<h2 id="title">Post Title</h2>
	    	<textarea id="post_title"name="title" rows="2" cols="100" value={this.state.title} onChange={this.handleChange} />
	    	<h2 className="postInstruction">Post Body</h2>
	    	<textarea id="postBody"name="body" rows="30" cols="100" value={this.state.body} onChange={this.handleChange}/>

			{/* select bar for tag */}
	    	<h2 className="postInstruction">Tags</h2>
	    	<h4 className="postInstructionSubtitle">Add tags to describe what your post is about.</h4>
	    	<div className="selectBar">
		    	<select onChange={this.handleChange} name="tag">
				  <option value="Lockdown Policy Updates">Lockdown Policy Updates</option>
				  <option value="Donation Information">Donation Information</option>
				  <option value="Public Health">Public Health</option>
				</select>
			</div>

			{/* select bar for location */}
	    	<h2 className="postInstruction">Location</h2>
	    	<h4 className="postInstructionSubtitle">Add location to indicate where your post is about.</h4>
	    	<div className="selectBar">
		    	<select value={this.state.location} onChange={this.handleChange} name="location">
				  <option value="Canada">Canada</option>
				  <option value="US">US</option>
				  <option value="China">China</option>
				</select>
			</div>

			{/* this.state.postBody, this.state.tag, this.state.location */}
			{/* will be saved to a database. */}
	    	<input type="submit" id="addPostButton" value="Add Post" onClick={() => this.post()}/>
			{(this.state.success === 1) ? (<div id="success"><div class="alert alert-success">
    			<strong>SUCCESS!</strong> You have created a new post!
  			</div></div>) : null}
			{(this.state.success === 2) ? (<div id="success"><div class="alert alert-danger">
    			<strong>Sorry!</strong> Title cannot be empty.
  			</div></div>) : null}
			  {(this.state.success === 3) ? (<div id="success"><div class="alert alert-danger">
    			<strong>Sorry!</strong> Title and body cannot be empty.
  			</div></div>) : null}
			  {(this.state.success === 4) ? (<div id="success"><div class="alert alert-danger">
    			<strong>Sorry!</strong> Body cannot be empty.
  			</div></div>) : null}
	    	</div>
	    );
	 }
}

export default withRouter(NewPost);