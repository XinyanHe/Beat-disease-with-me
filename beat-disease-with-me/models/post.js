/* Post mongoose model */
const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	// commenter id
    commenter: String,
	content: String,
	imageId: String
});

// Comments will be embedded in the Post model
const PostSchema = new mongoose.Schema({
	authorId: String,
	author: String,
	authorType: String,
	title: String,
	body: String,
	tag: String,
	location: String,
	likes: Number,
	comments: [CommentSchema],
	date: Date,
	imageId: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };