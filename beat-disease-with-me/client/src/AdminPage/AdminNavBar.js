import React from 'react';
import '../UserNavBar.css';

class AdminNavBar extends React.Component {
	render() {
		return (
			<div>
		    	<header>
		    	<h2 className="webLogo">
		    	 Beat Disease With Me
		    	</h2>
		    	<nav>
		    		<ul className="navList">
		    			<li><a className="bar" href="/adminPost">Manage Posts</a></li>
		    			<li><a className="bar" href="/admin">Manage Users</a></li>
		    			<li><a className="bar" href="/authorizeaccount">Authorize Accounts</a>
			    		</li>
						<li><a className="bar" href="/">Log out</a></li>
		    		</ul>
		    	</nav>
		    	</header>
			</div>
		)
	}
}

export default AdminNavBar;