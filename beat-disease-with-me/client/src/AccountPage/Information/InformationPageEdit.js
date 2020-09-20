import React, {Component} from 'react';
import './InformationPage.css';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import ImageForm from "../../frontPages/ImageForm";

class WarningMessage extends Component{
        render() {
            return (
                <p className='warning-fade'> {this.props.message}</p>)
        }
    }

class InformationPageEdit extends React.Component {

	constructor(props) {
		super(props);
	}

  // if user is professional user, there is an area for them to update 
  // description about relative experience
  renderSwitch() {

    const {app} = this.props;
		const curr_user = app.state.currentUser;
    console.log(curr_user.userType);
    
    switch(curr_user.userType) {
        case 'regular':
            return (
                <div></div>
            );
        default:
            return (
                <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Description About Relative Experience</label>
                </div>
                <div className="col-75">
                  <input type="text" className = "info" placeholder="Your description about relative experience.."/>
                </div>
                </div>
            );
    }
  }

  message = "";
  state = {
    username: "",
    password: "",
    emailAddress: "",
    image: require('./sponge.png'),
    profilePic: null,
    uploaded: false,
    emptyUpload: false,
    message1: { type: "", body: "" },
    imageId: ""
  }


    handlePicSelect = (event) => {
        event.preventDefault()
        this.setState({
            profilePic: event.target.files[0]
        })
    }

    handleUploadPic = (event) => {
      event.preventDefault()
        if (this.state.profilePic == null) {
            this.message = "Please select an image first."
            this.setState({emptyUpload: true})
            setTimeout(() => {
                this.setState({emptyUpload: false})
            }, 2000)
        } else{
            this.message = "Upload Succeed!"
            this.setState({uploaded:true})
            {/* Should send the image to the database here, I will complete this part in pharse 2 */}
            const fd = new FormData();
            fd.append('image', this.state.profilePic, this.state.profilePic.name)
            axios.post('', fd, {
                onUploadProgress: progressEvent => {
                    console.log('upload progress: ' + Math.round((progressEvent.loaded / progressEvent.total) * 100) + '%')
                }
            })
                .then(res => {
                    console.log(res)
                })
        }
    }

  render() {
    const {app} = this.props;
    const curr_user = app.state.currentUser; 

    console.log(this.props.info);

        return(
             <div className="container">
                {/* area for changing name */}
                <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Name</label>
                </div>
                <div className="col-75">
                  <input type="text" className = "info"  value={this.props.info.username} onChange={this.props.funcs("username")}/>
                </div>
                </div>

                {/* area for changing password */}
                <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Password</label>
                </div>
                <div className="col-75">
                  <input type="text" className = "info" value={this.props.info.password_shown} onChange={this.props.funcs("password")}/>
                </div>
                </div>

                {/* area for changing email address */}
                <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Email Address</label>
                </div>
                <div className="col-75">
                <input type="text" className = "info" value={this.props.info.emailAddress} onChange={this.props.funcs("emailAddress")}/>
                </div>
                </div>

                {/* area for changing profile picture */}
                <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Profile</label>
                </div>
                <div className="col-75">
                <img className="proPic" src={ curr_user.imageId } alt=""/>
                </div>
                </div>

                <div className="row">
                {/* <div>
                <input type="file" className="hiddenButton"  onChange={this.handlePicSelect}
                       ref={fileInput => this.fileInput = fileInput}/>
                <button className="selectButton" id="changePic"
                        onClick={() => this.fileInput.click()}>Select a new photo from your computer</button>
                <button onClick={this.handleUploadPic}> upload </button>
                </div> */}
                <ImageForm dashboard={this} type="profile picture"/>

                {(this.state.imageId !== "") ? (this.props.info.imageId = this.state.imageId) : (this.props.info.imageId = this.props.info.imageId)}

                {this.state.emptyUpload? (<WarningMessage message = {this.message}/>) : null}
                {this.state.uploaded? (<WarningMessage message = {this.message}/>) : null}

                {/* In phase 2, once submit is clicked, all the new data will be
                updated to the database. */}
                  {curr_user.userType === 'professional'? ( <div className="row">
                      <div className="col-25">
                          <label htmlFor="fname">Description About Relative Experience</label>
                      </div>
                      <div className="col-75">
                          <input type="text" className = "info" value={this.props.info.description} onChange={this.props.funcs("description")}/>
                      </div>
                  </div>): console.log("username", this.props.info.username)}
                <button className="changeInfo" onClick={this.props.submit}>Submit</button>

                </div>

              </div>
        );
    }
}

export default withRouter(InformationPageEdit);