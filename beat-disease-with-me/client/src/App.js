import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import {readCookie} from "./actions/user"


import ReactDOM from 'react-dom';
import createBrowserHistory from "history/createBrowserHistory";
import Follow from "./ProfessionalUserFollowing/Follow";
import Post from "./ExistingPost/Post";
import NewPost from "./NewPost/NewPost";
import SearchPost from "./SearchPost/SearchPost";
import Admin from "./AdminPage/DeleteUser/Admin";
import AdminPost from "./AdminPage/DeletePost/AdminPost";
import DeletedPost from "./AdminPage/DeletePost/DeletedPost";
import AuthorizeAccount from "./AdminPage/AuthorizeAccount/AuthorizeAccount";
import AccountNavBar from "./AccountPage/AccountNavBar";
import LoginPage from "./frontPages/FromPage";
import RegularRegister from "./frontPages/RegularRegister";
import ProfessionalRegister from "./frontPages/ProfessionalRegister";
import AccountFollowing from "./AccountPage/Following/Following";
import InfomationPage from "./AccountPage/Information/InfomationPage";

class App extends React.Component{

    constructor(props){
        super(props);
        readCookie(this);
    }

    state = {
        currentUser: null
    }

    render(){
        const{ currentUser } = this.state;
        console.log(currentUser);
        return(
            <BrowserRouter>
                <Switch>
                    <Route
                    exact path={['/','/login', '/searchpost']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <SearchPost history={history} app={this} />} 
                            </div>  
                        )}
                    />
                    {/* <Route exact path='/login' render={() =>(<LoginPage />)} /> */}
                    <Route exact path='/regRegister' render={() =>(<RegularRegister app={this} />)} />
                    <Route exact path='/proRegister' render={() =>(<ProfessionalRegister  app={this}/>)} />
                    <Route
                    exact path={['/','/login', '/follow', '/follow/:id']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <Follow app={this} />} 
                            </div>  
                        )}
                    />
                    <Route
                    exact path={['/','/login', '/post', '/post/:id']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <Post app={this} />} 
                            </div>  
                        )}
                    />

                    <Route
                    exact path={['/','/login', '/newpost']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <NewPost app={this} />} 
                            </div>  
                        )}
                    />
                    <Route exact path='/admin' render={() =>(<Admin app={this}/>)} />
                    <Route exact path='/adminPost' render={() =>(<AdminPost app={this}/>)} />
                    <Route exact path='/postDetail' render={() =>(<DeletedPost app={this}/>)} />
                    <Route
                    exact path={['/','/login', '/accountPage']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <AccountNavBar app={this} />} 
                            </div>  
                        )}
                    />
                    <Route
                    exact path={['/','/login', '/accountfollowing']}
                        render={({ history }) => (
                            <div>
                                { /* Different componenets rendered depending on if someone is logged in. */}
                                {!currentUser ? <LoginPage history={history} app={this} /> : <AccountFollowing app={this} />} 
                            </div>  
                        )}
                    />
                    <Route exact path='/authorizeaccount' render={() =>(<AuthorizeAccount app={this}/>)} />
                    <Route render={() =>(<InfomationPage app={this}/>)} />

                    <Route>
                        render = {() => <div>404 not found</div>}
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;