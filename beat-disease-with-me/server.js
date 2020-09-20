"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { Post } = require("./models/post");
const { User } = require("./models/user");
const { ProfUser } = require("./models/profUser");
// import the mongoose model
const { Image } = require("./models/image");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/*********************************************************/
// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'team14imgdb',
    api_key: '316739971497636',
    api_secret: 'sUN_-LPo4ElrDlTnKpHAtA5raLU'
});

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

/*** Image API Routes below ************************************/
// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// a GET route to get all images
app.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/*** API Routes below ************************************/
// Sign up regular user
app.post("/users", (req, res) => {
    if (mongoose.connection.readyState !== 1) {
    res.status(500).send('Internal server error')
    return}

    // Use the static method on the User model to find a user
    // by their email and password
    const user = new User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        userType: req.body.userType,
        following: [],
        likes: [],
        dislikes: [],
        imageId: req.body.imageId
    });

    // Save user to the database
    user.save().then(
        user => {
            console.log("regular register success");
            res.send(user);
        },
        error => {
            console.log("regular register error");
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// A route to login and create a session
app.post("/users/login", (req, res) => {

    const username = req.body.userName;
    const password = req.body.userPassword;

    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user;
            req.session.username = user.username;
            console.log(user);
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});


// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
});

// a GET route to get all regular users
app.get("/users", (req, res) => {
    User.find().then(
        result => {
            log();
            res.send({ result }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove a regular user by their id.
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete a user by their id
    User.findByIdAndRemove(id)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

/// a GET route to get a regular user by their id.
app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, 404.
        return;
    }

    // Otherwise, findById
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send(); // could not find this post
            } else {
                res.send({ user });
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

// app.get("/users/:username", (req, res) => {
//     const id = req.params.id;
//
//     if (!ObjectID.isValid(id)) {
//         res.status(404).send(); // if invalid id, 404.
//         return;
//     }
//
//     // Otherwise, findById
//     User.findById(id)
//         .then(user => {
//             if (!user) {
//                 res.status(404).send(); // could not find this post
//             } else {
//                 res.send({ user });
//             }
//         })
//         .catch(error => {
//             res.status(500).send(); // server error
//         });
// });

// a PATCH route for changing properties of a resource.
app.patch("/users/:id", (req, res) => {
    const id = req.params.id;

    // get the updated status only from the request body.
    const { following, username, emailAddress, password, likes, dislikes, imageId } = req.body;
    const body = { following, username, emailAddress, password, likes, dislikes, imageId };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Update the regular user by their id.
    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(result => {
            if (!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the post.
        });
});

// Sign up regular user
app.post("/pusers", (req, res) => {
    if (mongoose.connection.readyState !== 1) {
        res.status(500).send('Internal server error')
        return
    }
    // Use the static method on the User model to find a user
    // by their email and password
    const profUser = new ProfUser({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        description: req.body.description,
        status: "pending",
        onPage: true,
        userType: req.body.userType,
        follower: [],
        imageId: req.body.imageId,
        certificateId: req.body.certificateId,
        likes: [],
        dislikes: []
    });

    // Save user to the database
    profUser.save().then(
        user => {
            console.log("professional register success");
            res.send(user);
        },
        error => {
            console.log("professional register error");
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// a GET route to get all professional users
app.get("/pusers", (req, res) => {
    ProfUser.find().then(
        result => {
            log();
            res.send({ result }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a GET route to get a prof user by their id.
app.get("/pusers/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, 404.
        return;
    }

    // Otherwise, findById
    ProfUser.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send(); // could not find this post
            } else {
                res.send({ user });
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

app.post("/pusers/login", (req, res) => {

    const username = req.body.userName;
    const password = req.body.userPassword;

    log(username, password);
    // Use the static method on the User model to find a user
    // by their email and password
    ProfUser.findByprofUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user;
            req.session.username = user.username;
            console.log(user);
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});


// A route to logout a user
app.get("/pusers/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/pusers/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
});

// a PATCH route for changing properties of a resource.
app.patch("/pusers/:id", (req, res) => {
    const id = req.params.id;

    // get the updated status only from the request body.
    const { status, onPage, follower, username, emailAddress, password, description, likes, dislikes, imageId } = req.body;
    const body = { status, onPage, follower, username, emailAddress, password, description, likes, dislikes, imageId };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Update the professional user by their id.
    ProfUser.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(result => {
            if (!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the post.
        });
});

/// a DELETE route to remove a professional user by their id.
app.delete("/pusers/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete a prof user by their id
    ProfUser.findByIdAndRemove(id)
        .then(result => {
            if (!result) {
                res.status(404).send();
            } else {
                res.send(result);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});


/** Post resource routes **/
// a POST route to *create* a post
app.post("/posts", (req, res) => {
	if (mongoose.connection.readyState !== 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
    }

    // Create a new post using the Post mongoose model
    const post = new Post({
        authorId: req.body.userObj._id,
        author: req.body.userObj.username,
        authorType: req.body.userObj.userType,
        title: req.body.title,
        body: req.body.body,
        tag: (req.body.tag !== "") ? req.body.tag : "Lockdown Policy Updates",
        location: (req.body.location !== "") ? req.body.location : "Canada",
        likes: 0,
        comments: [],
        date: new Date(),
        imageId: req.body.userObj.imageId
    });

    // Save post to the database
    post.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// a GET route to get all posts
app.get("/posts", (req, res) => {
    Post.find().then(
        posts => {
            log();
            res.send({ posts }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a DELETE route to remove a post by their id.
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Delete a post by their id
    Post.findByIdAndRemove(id)
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

// a PATCH route for changing properties of a resource.
app.patch("/posts/:id", (req, res) => {
    const id = req.params.id;

    // get the updated likes only from the request body.
    const { likes } = req.body;
    const body = { likes };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
        return;
    }

    // Update the post by their id.
    Post.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(post => {
            if (!post) {
                res.status(404).send();
            } else {
                res.send(post);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the post.
        });
});

/// Route for adding comment to a particular post.
app.post('/posts/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return; 
	}

	if (mongoose.connection.readyState !== 1) {
		res.status(500).send()
		return;
	} 

	Post.findById(id).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			post.comments.push({ commenter: req.body.commenter, content: req.body.content, imageId: req.body.imageId }) 
			post.save().then((result) => {
				res.send(result)
			}).catch((error) => {
				if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
					res.status(500).send()
				} else {
					log(error) // log server error to the console, not to the client.
					res.status(400).send() // 400 for bad request gets sent to client.
				}
			})
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error')
	})
})

/// Route for deleting comment
app.delete('/posts/:id/:comment_id', (req, res) => {
	const post_id = req.params.id
	const comment_id = req.params.comment_id

	if (!ObjectID.isValid(post_id)) {
		res.status(404).send()  
		return; 
	}

	if (!ObjectID.isValid(comment_id)) {
		res.status(404).send()  
		return; 
	}

	if (mongoose.connection.readyState !== 1) {
		res.status(500).send()
		return;
	} 

	Post.findById(post_id).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {   
			const comment = post.comments.id(comment_id);
			if (!comment) {
				res.status(404).send()
			} else {
				post.comments.id(comment_id).remove();
				post.save().then((result) => {
					res.send(result)
				}).catch((error) => {
					res.status(500).send()
				})
			}
		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send()
	})
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    // const goodPageRoutes = ["/", "/login", "/dashboard"];
    // if (!goodPageRoutes.includes(req.url)) {
    //     // if url not in expected page routes, set status to 404.
    //     res.status(404);
    // }

    // send index.html
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
