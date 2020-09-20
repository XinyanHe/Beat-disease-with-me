import React from "react";
import {Link} from 'react-router-dom'
import './SearchPost.css';

// This is the hardcode data we used in phase 1

import UserNavBar from '../UserNavBar';
import { withRouter } from 'react-router-dom';
import {uid} from 'react-uid'
import { getPosts } from "../actions/post";

class SearchPost extends React.Component{

      constructor(props) {
        super(props);
        this.props.history.push("/searchpost");
    }

    state = {
        search:"",
        tag: "",
        location: "",
        type: "",
        sort: "likes",
        postList: [],
        display: "all"
    };

    renderSwitch(user) {
      switch(user.userType) {
        case 'regular':
          return (
            <div className="filter">
            <h2 className="postInstruction">Display</h2>
            <div className="selectBar">
                <select value={this.state.display} onChange={this.handleChange} name="display">
                    <option value="all">See all</option>
                    <option value="following">Only see following</option>
                </select>
            </div>
        </div>
          )
            default:
              return null
      }
    }
    
    //get the input for search
    searchSpace = (event)=>{
        const keyword = event.target.value;
        this.setState({search:keyword})
    }

   handleChange = (event) => {
      const target = event.target
      const value = target.value
      const name = target.name
      this.setState({[name]: value});
    }

    componentDidMount(){ getPosts(this) }

    render(){

      const {app} = this.props;
      console.log(app);

      //If you want to access the current user
      const user = app.state.currentUser;
      console.log(user);
      
      return (
        
        <div>
          {/* navigation bar at the top */}
          <UserNavBar app = {app}/>
          {this.sort}
          {/* search bar */}
            <h2 id="title">Search here</h2>
            <textarea id="post_title"name="message" rows="2" cols="100" onChange={(e) => this.searchSpace(e)}/>

          {/* tag search filter */}
            <div className="filter">
            <h2 className="postInstruction">Tags</h2>
            <div className="selectBar">
              <select onChange={this.handleChange} name="tag">
              <option value="">All Tags</option>
              <option value="Lockdown Policy Updates">Lockdown Policy Updates</option>
              <option value="Donation Information">Donation Information</option>
              <option value="Public Health">Public Health</option>
            </select>
            </div>
            </div>

          {/* location search filter */}
            <div className="filter">
            <h2 className="postInstruction">Location</h2>
            <div className="selectBar">
              <select value={this.state.location} onChange={this.handleChange} name="location">
              <option value="">All Locations</option>
              <option value="Canada">Canada</option>
              <option value="US">US</option>
              <option value="China">China</option>
            </select>
            </div>
            </div>

          {/* user type search filter */}
          <div className="filter">
          <h2 className="postInstruction">User Type</h2>
            <div className="selectBar">
              <select value={this.state.type} onChange={this.handleChange} name="type">
              <option value="">All Types</option>
              <option value="regular">Regular User</option>
              <option value="professional">Professional User</option>
              </select>
            </div>
          </div>

            {/* user type search filter */}
            <div className="filter">
                <h2 className="postInstruction">Sort</h2>
                <div className="selectBar">
                    <select value={this.state.sort} onChange={this.handleChange} name="sort">
                        <option value="date">By time</option>
                        <option value="likes">By likes</option>
                    </select>
                </div>
            </div>

            {this.renderSwitch(user)}

          <h2 className="postInstruction">Suggestions</h2>
        {/* filter function */}
        {this.state.postList.filter((data)=>{
            {/* code below will require data from database in phase 2 */}
            {/* data here are hardcoded  */}
            if (user.userType === 'regular' && this.state.display === "following") {
              if(this.state.search === ""){if (user.following.includes(data.authorId) && data.tag.toLowerCase().includes(this.state.tag.toLowerCase()) && 
                data.location.toLowerCase().includes(this.state.location.toLowerCase()) &&
                data.authorType.toLowerCase().includes(this.state.type.toLowerCase())) {return data} else {return null}}
              else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) &&
              data.tag.toLowerCase().includes(this.state.tag.toLowerCase()) && 
              data.location.toLowerCase().includes(this.state.location.toLowerCase()) &&
              data.authorType.toLowerCase().includes(this.state.type.toLowerCase())){return data}
              else {return null}
            } else {
              if(this.state.search === ""){if (data.tag.toLowerCase().includes(this.state.tag.toLowerCase()) && 
                data.location.toLowerCase().includes(this.state.location.toLowerCase()) &&
                data.authorType.toLowerCase().includes(this.state.type.toLowerCase())) {return data} else {return null}}
              else if(data.title.toLowerCase().includes(this.state.search.toLowerCase()) &&
              data.tag.toLowerCase().includes(this.state.tag.toLowerCase()) && 
              data.location.toLowerCase().includes(this.state.location.toLowerCase()) &&
              data.authorType.toLowerCase().includes(this.state.type.toLowerCase())){return data}
              else {return null}
            }
        }).sort((a, b)=>{
          if (this.state.sort === "likes") {return b.likes - a.likes}
          else {return new Date(b.date) - new Date(a.date)}
        }).map(data=>{
            return(
            <li id = "postList" key={uid(data)}>
            <Link to={{
					pathname: "/post/" + data._id,
					data: [{display: "Following"}],
          state: {
            post: data
          }

				}} style={{ textDecoration: 'none' }}>
            <span id = "posttitle">{data.title}</span>
            </Link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
            <div id = "likes"><i className="fa fa-heart" aria-hidden="true">{data.likes}</i></div>
            {console.log(new Date(data.date))}
                <i id = "date">{data.date.slice(0, 10)}</i>
                <i id = "date">{data.author}</i>
            <div id = "postContent">{data.body.substring(0, 80) + "..."}</div>
            </li>
          )
        })}
      </div>
      );
    }
}

export default withRouter(SearchPost);

  