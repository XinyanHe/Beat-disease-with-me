import React from 'react';
import './Admin.css';
import AdminNavBar from '../AdminNavBar'
import {uid} from 'react-uid';
import { getUsers, deleteUser } from "../../actions/user";
import { getProfUsers, deleteProfUser } from "../../actions/profUser";

class Admin extends React.Component {
  // All existing users, including their username. usertype are hardcoded here,
  // and these data will get from database in phase 2.
  state = {
    userList: [],
    profUserList: []
  }

  componentDidMount(){ 
    getUsers(this);
    getProfUsers(this);
  }

  removeUser= (user) => {
      const filteredUsers = this.state.userList.filter((s) => {
        return s !== user
      })
      this.setState({
        userList: filteredUsers
      })
      deleteUser(user._id)
  }

  removeProfUser= (user) => {
    const filteredUsers = this.state.profUserList.filter((s) => {
      return s !== user
    })
    this.setState({
      profUserList: filteredUsers
    })
    deleteProfUser(user._id)
}

  //get the input for search
  searchSpace = (event)=>{
    const keyword = event.target.value;
    this.setState({search:keyword})
  }

  render() {
      return (
            <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
            <AdminNavBar/>
            <h2 id="title">Search User Name</h2>
            <textarea id="post_title"name="message" rows="2" cols="100" onChange={(e)=>this.searchSpace(e)}></textarea>
            <div className="tableContentAdmin">
              <table>
                  <tbody>
                    <tr>
                      <th>
                        User ID
                      </th>
                      <th>
                        User Name
                      </th>
                      <th>
                        User Type
                      </th>
                      <th>
                        Delete
                      </th>
                    </tr>
                  {/* All existing data are hardcoded here, and will be get from
                  database in phase 2. */}
                  {this.state.userList.filter((data)=>{
                    if(this.state.search == null) return data
                    else if(data.username.toLowerCase().includes(this.state.search.toLowerCase())){return data}
                    else {return null}
                    }).map(data=>{
                      return(
                        <tr key={uid(data)}>
                        <td>{data._id}</td>
                        <td>{data.username}</td>
                        <td>regular</td>
                        <td>
                          <div className="trash"
                              onClick={
                                () => this.removeUser(data)}>
                              <i className="fa fa-trash fa-2x like" aria-hidden="true"></i>
                          </div>
                        </td>
                        </tr>
                      )
                    })
                  }
                  {this.state.profUserList.filter((data)=>{
                    if (data.status === "authorized") {
                      if(this.state.search == null) return data
                      else if(data.username.toLowerCase().includes(this.state.search.toLowerCase())){return data}
                      else {return null}
                    }
                    }).map(data=>{
                      return(
                        <tr key={uid(data)}>
                        <td>{data._id}</td>
                        <td>{data.username}</td>
                        <td>professional</td>
                        <td>
                          <div className="trash"
                              onClick={
                                () => this.removeProfUser(data)}>
                              <i className="fa fa-trash fa-2x like" aria-hidden="true"></i>
                          </div>
                        </td>
                        </tr>
                      )
                    })
                  }               

              </tbody>
              </table>
              </div>
            </div>
      );
  }
}

export default Admin;