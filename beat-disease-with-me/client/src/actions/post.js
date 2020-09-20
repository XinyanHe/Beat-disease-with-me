import { connect } from "mongoose";

// A function to send a POST request with a new post
export const addPost = (formComp) => {
    // the URL for the request
    const url = "/posts";

    // The data we are going to send in our request
    const post = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(post),
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
                return res.json();
            } else {
                // If server couldn't add the post, tell the user.
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            formComp.setState({ newPost: json });
        })        
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each post
export const getPosts = (postList) => {
    // the URL for the request
    const url = "/posts";

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
            postList.setState({ postList: json.posts });
        })
        .catch(error => {
            console.log(error);
        });
};

// // A function to send a GET request to the web server,
// export const getPosts = (post, id) => {
//     // the URL for the request
//     const url = "/posts/";

//     // Since this is a GET request, simply call fetch on the URL
//     fetch(url)
//         .then(res => {
//             if (res.status === 200) {
//                 // return a promise that resolves with the JSON body
//                 return res.json();
//             } else {
//                 alert("Could not get post");
//             }
//         })
//         .then(json => {
//             // the resolved promise with the JSON body
//             post.setState({ post: json.post });
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };

// A function to send a PATCH request with a post
export const updatePost = (id, numLikes) => {
    // the URL for the request
    const url = "/posts/" + id;

    // The data we are going to send in our request
    const updatedPost = {likes: numLikes}

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify(updatedPost),
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

// A function to send a POST request with a comment
export const addCommenttoPost = (id, commenter, content, imageId) => {
    // the URL for the request
    const url = "/posts/" + id;

    // The data we are going to send in our request
    const newComment = {commenter: commenter,
                        content: content,
                        imageId: imageId}

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newComment),
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
export const deletePost = (id) => {
    // the URL for the request
    const url = "/posts/" + id;

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