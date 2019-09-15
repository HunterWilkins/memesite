const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let CommentSchema = new Schema ({

    commenter: {
        type: String
    },

    post: {
        type: String,
    },

    score: {
        type: Number
    },

    text: {
        type: String
    }

});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;