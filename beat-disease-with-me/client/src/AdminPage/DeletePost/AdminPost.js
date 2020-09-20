import React from 'react';
import {Link} from 'react-router-dom'
import {uid} from 'react-uid'
import AdminNavBar from '../AdminNavBar'
import { getPosts, deletePost } from "../../actions/post";

class AdminPost extends React.Component {
  state = {
    postList: []
  }

  removePost = (post) => {
      const filteredPosts = this.state.postList.filter((s) => {
        return s !== post
      })
      this.setState({
        postList: filteredPosts
      })
      deletePost(post._id)
  }

  //get the input for search
  searchSpace = (event)=>{
    const keyword = event.target.value;
    this.setState({search:keyword})
  }

  componentDidMount(){ getPosts(this) }

  render() {
      return (
            <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
            <AdminNavBar/>
            <h2 id="title">Search Post Title</h2>
            <textarea id="post_title"name="message" rows="2" cols="100" onChange={(e)=>this.searchSpace(e)}></textarea>
            <div className="tableContentAdmin">
              <table>
                  <tbody>
                    <tr>
                      <th>
                        Post ID
                      </th>
                      <th>
                        Post Title
                      </th>
                      <th>
                        User Name
                      </th>
                      <th>
                        Likes
                      </th>
                      <th>
                        See Post Details
                      </th>
                      <th>
                        Delete
                      </th>
                    </tr>

                    {/* All existing posts are hardcoded here, need to get from
                    database in phase 2. */}
                    {this.state.postList.filter((data)=>{
                    if(this.state.search == null) return data
                    else if(data.title.toLowerCase().includes(this.state.search.toLowerCase())){return data}
                    else {return null}
                    }).map((post) => {
                      return(
                        <tr key={uid(post)}>
                          <td>
                            {post._id}
                          </td>
                          <td>
                            {post.title}
                          </td>
                          <td>
                            {post.author}
                          </td>
                          <td>
                            {post.likes}
                          </td>
                          <td>
                            <Link to={{
                                pathname: "/postDetail",
                                state: {
                                post: post}}}>
                            <button id="detailButton"
                            >DETAILS</button>
                            </Link>                         
                          </td>
                          <td>
                            <div className="trash"
                              onClick={
                                () => this.removePost(post)}>
                                <i className="fa fa-trash fa-2x like" aria-hidden="true"></i>
                            </div>                          
                          </td>
                        </tr>                       
                      )
                    })}

                  </tbody>
              </table>
              </div>
            </div>
      );
  }
}

export default AdminPost;