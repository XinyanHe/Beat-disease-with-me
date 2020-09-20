import React from 'react';
import '../AdminPage/UserNavBar.css';
import Following from "./Following/Following";
import InfomationPage from "./Information/InfomationPage";
import AccountPost from "./Posts/AccountPagePost";
import AccountMainPage from "./AcountMainPage";
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom'

import { logout } from '../actions/user'


class AccountNavBar extends React.Component {

	constructor(props) {
		super(props);
		this.props.history.push("/accountPage");
	}

	state= {
		bodyComponent:InfomationPage,
		bodyActive: "InfomationPage"
	}

	logoutUser = (app) => {
        this.props.history.push("/login");
        logout(app);
	};

	renderSwitch() {
		const {app} = this.props;
		const curr_user = app.state.currentUser;
		console.log(curr_user.userType);

        switch(curr_user.userType) {
            case 'regular':
                return (
					<li><a className="bar"	usertype={curr_user.userType} onClick={() => {this.setState({bodyComponent: Following, bodyActive: "Following"})}}>Following</a></li>
				);
			case 'professional':
				return (
					<li><a className="bar"	usertype={curr_user.userType} onClick={() => {this.setState({bodyComponent: Following, bodyActive: "Following"})}}>Follower</a></li>
				);
        }
	}
	
	componentDidMount() {
		const { data } = this.props.location
		if (data == null){
			return
		}
		const thisDisplay = data[0].display
		if (thisDisplay === this.state.bodyActive){
			//pass
		}
		else{
			if (thisDisplay === "InfomationPage"){
				this.setState({bodyComponent:InfomationPage, bodyActive: thisDisplay})
			}
			else if (thisDisplay === "AccountPost"){
				this.setState({bodyComponent:AccountPost, bodyActive: thisDisplay})
			}
			else{
				this.setState({bodyComponent:Following, bodyActive: thisDisplay})
			}
		}
	}
	render() {
		const {app} = this.props;
		const curr_user = app.state.currentUser;

		return (
			<div>
		    	<header>
		    	<h2 className="webLogo">
		    	 Beat Disease With Me
		    	</h2>
		    	<nav>
		    		<ul className="navList">
						<li><Link to={{pathname: "/searchpost"}} className="bar" >Search</Link></li>
		    			<li><Link to={{pathname: "/newpost"}} className="bar" >New Post</Link></li>
		    			<li><Link to={{pathname: "/accountPage"}} className="bar" >Manage Account</Link>
			    			<ul className="navList">
			    				<li><a className="bar" onClick={() => {
									this.setState({bodyComponent: InfomationPage, bodyActive: "InfomationPage"});
								}
								}>Personal Info</a></li>
			    				<li><a className="bar" onClick={() => {this.setState({bodyComponent: AccountPost, bodyActive: "AccountPost"})}}>Post History</a></li>
			    				{this.renderSwitch()}
			    			</ul> 
			    		</li>
						<li><Link to={{pathname: "/login"}} className="bar" onClick={() => this.logoutUser(app)}>Logout</Link></li>
		    		</ul>
		    	</nav>
		    	</header>
				<AccountMainPage app={app} Component = {this.state.bodyComponent} Active = {this.state.bodyActive}/>
			</div>
		)
	}
}

export default withRouter(AccountNavBar);