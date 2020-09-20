import React from 'react';
import {uid} from 'react-uid'
import './AuthorizeAccount.css';
import AdminNavBar from '../AdminNavBar'
import { getProfUsers, updateProf} from "../../actions/profUser";

class AuthorizeAccount extends React.Component {

  state = {
    profUserList: []
  }

  componentDidMount(){ getProfUsers(this) }

  authorizeAccount = (professional, id) => {
    this.setState(prev => ({
      profUserList: prev.profUserList.map(item => item === professional ? { ...professional, status: 'authorized' } : item)
    }))
    updateProf(id, "authorized", professional.onPage, professional.follower, professional.username, professional.emailAddress, professional.password, professional.description, professional.likes, professional.dislikes, professional.imageId)
  }

  declineAccount = (professional, id) => {
    this.setState(prev => ({
      profUserList: prev.profUserList.map(item => item === professional ? { ...professional, status: 'declined' } : item)
    }))
    updateProf(id, "declined", professional.onPage, professional.follower, professional.username, professional.emailAddress, professional.password, professional.description, professional.likes, professional.dislikes, professional.imageId)
  }

  // if admin wants to remove the professional user from THIS page, they can
  // remove them from THIS page, not from database! 
  removeProfessional = (professional) => {
      const filteredProfessionals = this.state.profUserList.filter((s) => {
        return s !== professional
      })
      this.setState({
        profUserList: filteredProfessionals
      })
      updateProf(professional._id, professional.status, false, professional.follower, professional.username, professional.emailAddress, professional.password, professional.description, professional.likes, professional.dislikes, professional.imageId)
  }

  render() {
      return (
            <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"/>
            <AdminNavBar/>
            <div className="tableContentAdmin">
              <table>
                  <tbody>
                    <tr>
                      <th>
                        Professional User ID
                      </th>
                      <th>
                        User Name
                      </th>
                      <th>
                        Certificate
                      </th>
                      <th>
                        Description
                      </th>
                      <th>
                        State
                      </th>
                      <th>
                        Authorize/Decline
                      </th>
                      <th>
                       Remove
                      </th>
                    </tr>

                    {/* all professional users waiting for authorize are hardcoded
                    here, will be get from database in phase 2 */}
                    {this.state.profUserList.filter((data)=>{
                      if (data.onPage) {
                        return data
                      }
                    }).map((professional) => {
                      return(
                        <tr key={uid(professional)}>
                          <td>
                            {professional._id}
                          </td>
                          <td>
                            {professional.username}
                          </td>
                          <td>
                            <img id="certificatePic" src={ professional.certificateId } alt=""/>
                          </td>
                          <td>
                            {professional.description}
                          </td>
                          <td>
                            {professional.status}                        
                          </td>
                          <td>
                            <div className="authorize"
                            onClick={
                                () => this.authorizeAccount(professional, professional._id)}>
                            <i className="fa fa-check fa-2x like" aria-hidden="true"></i>
                            </div>  
                            <div className="decline"
                            onClick={
                                () => this.declineAccount(professional, professional._id)}>
                            <i className="fa fa-times fa-2x like" aria-hidden="true"></i>
                            </div>                           
                          </td>
                          <td>
                            <div className="trash"
                              onClick={
                                () => this.removeProfessional(professional)}>
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

export default AuthorizeAccount;