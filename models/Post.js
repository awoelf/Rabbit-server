const commentSchema = require('./Comment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
    postAuthor: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    textContent: {
        type: String,
        trim: true
    },
    imageContent: {
        type: String
    },
    likes: {
        type: Number,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [commentSchema],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;