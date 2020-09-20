// A function to send a POST request with
export const signUp = (signupComp) => {
    // the URL for the request
    const url = "/pusers";

    // The data we are going to send in our request
    const profUser = signupComp.state;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(profUser),
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
                console.log("Professional Sign up error!");
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server to get one particular prof user
export const getProfUser = (userObj, id) => {
    // the URL for the request
    const url = "/pusers/" + id;

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

// A function to send a GET request to the web server to get one particular prof user's name
export const getProfUserName = (followingList, id) => {
    // the URL for the request
    const url = "/pusers/" + id;

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

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each professional user
export const getProfUsers = (profUserList) => {
    // the URL for the request
    const url = "/pusers";

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
            profUserList.setState({ profUserList: json.result });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a PATCH request with a professional user
export const updateProf = (id, status, onPage, follower, username, emailAddress, password, description, likes, dislikes, imageId) => {
    // the URL for the request
    const url = "/pusers/" + id;

    // The data we are going to send in our request
    const updatedProf = {status: status, onPage: onPage, follower: follower, username: username, emailAddress: emailAddress, password: password, description: description, likes: likes, dislikes: dislikes, imageId: imageId}

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedProf),
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

// A function to send a DELETE request
export const deleteProfUser = (id) => {
    // the URL for the request
    const url = "/pusers/" + id;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "DELETE"
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
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
    const url = "/pusers/check-session";

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

// A function to send a POST request with the professional user to be logged in
export const loginProf = (loginComp, app) => {

    const url = "/pusers/login";
    const user = loginComp.state;

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
                return res.json();
            }else{
                console.log("failed login")
            }
        })
        .then(json => {
            if(json.currentUser.status !== "authorized"){
                console.log("Your current status has not been authorized")
            }
            if (json.currentUser !== undefined && json.currentUser.status === "authorized") {
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
    const url = "/pusers/logout";

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