const session = require("express-session");


const users = [
    {username: "Carl", id: 1, password: "frog"}    
]

module.exports = function(app) {
    app.get("/", function(req, res) {
        console.log(req.session);
        res.render("landing", {userId: req.session.userId});
    });

    app.get("/post/:id", function(req, res){
        res.render("post");
    })

    app.get("/dash", function(req, res) {
        res.render("dash", {userId: req.session.userId});
    });

    app.get("/faq", function(req, res) {
        res.render("faq", {userId: req.session.userId});
    });
};