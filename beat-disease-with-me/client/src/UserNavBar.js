import React from 'react';
import './UserNavBar.css';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom'
// import user from '../../models/user';
import { logout } from './actions/user'


class UserNavBar extends React.Component {

	constructor(props) {
        super(props);
    }
	
	logoutUser = (app) => {
        this.props.history.push("/login");
        logout(app);
	};
	
  renderSwitch() {

	const {app} = this.props;
	// console.log(app);

	const user = app.state.currentUser;
	// console.log(user);

  	switch(user.userType) {
  		case 'regular':
  			return (
				<li><Link className = "bar" to={{
					pathname: "/accountPage",
					data: [{display: "Following"}],
					state: {usertype: user.userType,
						user: user._id,
						pw: user.password}

				}}> Following </Link></li>
      		);
  		default:
  			return (
				<li><Link className = "bar" to={{
					pathname: "/accountPage",
					data: [{display: "Following"}],
					state: {usertype: user.userType,
						user: user._id,
						pw: user.password}

				}}> Follower </Link></li>
			)
  	}
  }
	render() {

		const {app} = this.props;
		// console.log(app);
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
		    			<li><Link to={{pathname: "/newpost"}} className="bar">New Post</Link></li>
		    			<li><Link to={{pathname: "/accountPage"}} className="bar" >Manage Account</Link>
			    			<ul className="navList">

			    				<li><Link className = "bar" to={{
									pathname: "/accountPage",
									data: [{display: "InfomationPage"}],
									state: {usertype: curr_user.userType, user: curr_user._id, pw: curr_user.pw}
								}}> Personal Info </Link></li>
								<li><Link className = "bar" to={{
									pathname: "/accountPage",
									data: [{display: "AccountPost"}],
									state: {usertype: curr_user.userType, user: curr_user._id, pw: curr_user.pw}
								}}> Post History </Link></li>

								{this.renderSwitch()}

			    			</ul> 
			    		</li>
						<li><Link to={{pathname: "/login"}} className="bar" onClick={() => this.logoutUser(app)}>Logout</Link></li>
		    		</ul>
		    	</nav>
		    	</header>
			</div>
		)
	}
}

export default withRouter(UserNavBar);