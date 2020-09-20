import React from 'react';
import {Link} from 'react-router-dom';
import {uid} from 'react-uid';
import './AccountPagePost.css';
import { withRouter } from 'react-router-dom';
import { getPosts, deletePost } from "../../actions/post";

class AccountPost extends React.Component {
  // All the posts posted by the user are hardcoded here, including post title,
  // number of likes, tag and location. In phase 2, it will be get from database.
  state = {
    postList: []
  }

  componentDidMount(){ getPosts(this) }

  deletePost = (post) => {
      const filteredPost = this.state.postList.filter((s) => {
        return s !== post
      })
      this.setState({
        postList: filteredPost
      })
      deletePost(post._id)
  }

  render() {
        const {app} = this.props;
        const curr_user = app.state.currentUser;
        return(
          <div className="tableContent">
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
              <table>
                  <tbody>
                    <tr>
                      <th>
                        Post Title
                      </th>
                      <th>
                        Likes
                      </th>
                      <th>
                        Tag
                      </th>
                      <th>
                        Location
                      </th>
                      <th>
                        See Post Details
                      </th>
                      <th>
                       Delete Post
                      </th>
                    </tr>
                    {this.state.postList.filter((data)=>{
                      if(data.authorId === curr_user._id) { return data }
                      else { return null}
                    }).map(data=>{
                      return(
                        <tr key={uid(data)}>
                          <td>
                            {data.title}
                          </td>
                          <td>
                            {data.likes}
                          </td>
                          <td>
                            {data.tag}
                          </td>
                          <td>
                            {data.location}
                          </td>
                          <td>
                            <Link to={{
                                pathname: "/post",
                                state: {
                                  post: data
                                }}}>
                            <button id="detailButton"
                            >DETAILS</button>
                            </Link>                          
                          </td>
                          
                          {/* button to delete the post */}
                          <td>
                            <div className="trash"
                              onClick={
                                () => this.deletePost(data)}>
                                <i className="fa fa-trash fa-2x like" aria-hidden="true"></i>
                            </div>                          
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

export default withRouter(AccountPost);