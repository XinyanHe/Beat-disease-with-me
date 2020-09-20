// A function to send a POST request with 
export const signUp = (signupComp) => {
    // the URL for the request
    const url = "/users";

    // The data we are going to send in our request
    const user = signupComp.state;
    console.log(user)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If post was added successfully, tell the user.
            } else {
                // If server couldn't add the post, tell the user.
                console.log("Regular Sign up error!");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each regular user
export const getUsers = (userList) => {
    // the URL for the request
    const url = "/users";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get posts");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            userList.setState({ userList: json.result });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a DELETE request
export const deleteUser = (id) => {
    // the URL for the request
    const url = "/users/" + id;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "DELETE"
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If post was added successfully, tell the user.
            } else {
                // If server couldn't add the post, tell the user.
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server to get one particular user
export const getUser = (userObj, id) => {
    // the URL for the request
    const url = "/users/" + id;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get user");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            userObj.setState({ userObj: json.user });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server to get one particular user
export const getUserName = (followingList, id) => {
    // the URL for the request
    const url = "/users/" + id;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get user");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            followingList.state.followingList.push({id: id, username: json.user.username})
            // followingList.state.followingList.push(json.user.username)
            followingList.setState({ followingList: followingList.state.followingList });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a PATCH request with a regular user
export const updateUser = (id, following, username, emailAddress, password, likes, dislikes, imageId) => {
    // the URL for the request
    const url = "/users/" + id;

    // The data we are going to send in our request
    const updatedUser = {following: following, username: username, emailAddress: emailAddress, password: password, likes: likes, dislikes: dislikes, imageId: imageId}

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If post was added successfully, tell the user.
            } else {
                // If server couldn't add the post, tell the user.
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};



// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const url = "/users/login";
    const user = loginComp.state;
    console.log(user);

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                console.log("success login")
                loginComp.setState({authentication: true})
                return res.json();
            }else{
                loginComp.message = "Login failed"
                loginComp.setState({showMessage: true})
                console.log("failed login")
            }
        })
        .then(json => {
            if (json.currentUser !== undefined) {
                console.log(json.currentUser);
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
            });
        })
        .catch(error => {
            console.log(error);
        });
};