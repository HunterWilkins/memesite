const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PostSchema = new Schema ({
    title : {
        type: String
    },

    author: {
        type: String
    },

    body: {
        type: String
    },

    // img: {
    //     type: Buffer
    // },

    genre: {
        type: String
    },

    tag: {
        type: String
    },

    score: {
        type: String
    },

    impression: {
        type: String
    },

    id: {
        type: String,
        unique: true
    }
});

let Post = mongoose.model("Post", PostSchema);

module.exports = Post;