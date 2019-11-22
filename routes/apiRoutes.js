module.exports = function(app) {
    const bcrypt = require("bcryptjs");
    let db = require("../models");

    app.get("/currentUser", function(req, res) {
        db.User.find({
            id: req.session.userId
        }).then(function(dbUser) {
            res.json(dbUser);
        }).catch(err => console.log(err));
    })

    app.get("/all/posts", function(req, res){
        db.Post.find({})
        .then(function(dbUser) {
            res.json(dbUser);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.get("/api/post/:id", function(req, res){
        db.Post.findOne({
            "id" : req.params.id
        }).then(function(dbPost){
            res.json(dbPost);
        }).catch(err => console.log(err));
    });

    app.get("/api/comments/:id", function(req, res){
        db.Comment.find({
            "post" : req.params.id
        }).then(function(dbComment){
           res.json(dbComment); 
        }).catch(err => console.log(err));
    })

    app.post("/api/signup", function(req, res) {
        
        db.User.create(req.body)
        .then(function(dbUser){
            console.log(req.body.username + ", welcome to MEMES!");
            res.json(dbUser);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/api/login", function(req, res){
        let newId = Math.floor(Math.random()*2000).toString();
        db.User.findOneAndUpdate({
            "username" : req.body.username,
            "password" : req.body.password,
        }, {"id" : newId}, {useFindAndModify: false})
        .then(function(dbUser){
            req.session.userId = newId;
            res.json(dbUser);
        }).catch(function(err){
            res.json(err);
        });
    });

    app.post("/api/logout", function(req, res){
        req.session.destroy();
        res.render("landing");
    });

    app.post("/submit/post", function(req, res){
        db.User.findOne({
            "id" : req.session.userId
        }).then(function(dbUser){
            req.body.author = dbUser.username;
            req.body.score = 0;
            req.body.impression = null;
            req.body.id = 
            db.Post.create(req.body)
            .then(function(dbPost){
                dbPost.save();
            }).catch(err => console.log(err));
            console.log(dbUser);
            dbUser.save();

        }).catch(err => console.log(err));
    });

    app.post("/submit/comment", function(req, res){
        db.User.findOne({
            "id" : req.session.userId
        }).then(function(dbUser){
            req.body.commenter = dbUser.username;
            db.Comment.create(req.body)
            .then(function(dbComment){
                dbComment.save();
            }).catch(err => console.log(err));

            dbUser.save();
        }).catch(err => console.log(err));

    });

}