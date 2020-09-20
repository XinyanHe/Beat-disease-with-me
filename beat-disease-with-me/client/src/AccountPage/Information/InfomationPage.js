import React , {Component} from 'react';
import axios from "axios";
import { Button } from 'reactstrap';
import './InformationPage.css';
import { updateUser } from "../../actions/user";
// import { getUser } from "../../actions/user";
// import { getImage } from "../../actions/image";

class InfomationPage extends Component {

    constructor(props) {
        super(props);
    }
    
    state = {
        userObj: null,
        profilePic: null
    }

    componentDidMount(){
        const curr_user = this.props.info; 

        this.setState({userObj: curr_user})
        // getImage(this)
    }

    getName = () => {
        return this.state.userObj
    }

    render() {
            const curr_user = this.props.info; 
            return(
            <div className="container">
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Name</label>
                    </div>
                    <div className="col-75">
                        <p className = "info"> {(this.getName() !== null) ? curr_user.username : null} </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Password</label>
                    </div>
                    <div className="col-75">

                    <p className = "info"> ****** </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Email Address</label>
                    </div>
                    <div className="col-75">
                    <p className = "info"> {(this.getName() !== null) ? curr_user.emailAddress : null} </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Profile</label>
                    </div>
                    <div className="col-75">
                        {console.log(curr_user)}
                    {(this.getName() !== null) ? (<img className="proPic" src={ curr_user.imageId } alt=""/>) : null}
                    </div>
                </div>
                {curr_user.userType === "professional" ? ( <div className="row">
                    <div className="col-25">
                        <label htmlFor="fname">Description About Relative Experience</label>
                    </div>
                    <div className="col-75">
                        <p className = "info"> {curr_user.description}</p>
                    </div>
                </div>): null}
                <Button color="primary" className="changeInfo" onClick={this.props.edit}>Edit</Button>{' '}
            </div>

        );
    }

}
export default InfomationPage