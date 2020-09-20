/* Post mongoose model */
'use strict';
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Comments will be embedded in the Post model
const profUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    emailAddress: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
        	validator: validator.isEmail,   // custom validator
        	message: 'Not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    description: {
        // can be either regular or professional
        type: String,
        required: true,
        minlength: 1
    },
    status: {
        type: String
    },
    onPage: {
        type: Boolean
    },
    userType: {
    	// can be either regular or professional
    	type: String,
		required: true,
		minlength: 1
    },
	follower: {
		type: [String],
		required: true
    },
    likes: {
		type: [String],
		required: true
    },
    dislikes: {
        type: [String],
		required: true
    },
    imageId: {
		type: String
    },
    certificateId: {
		type: String
	}
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
profUserSchema.pre('save', function(next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

profUserSchema.statics.findByprofUsernamePassword = function(username, password) {
	const User = this // binds this to the User model

	// First find the user by their email
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const ProfUser = mongoose.model('profUser', profUserSchema);

module.exports = { ProfUser };