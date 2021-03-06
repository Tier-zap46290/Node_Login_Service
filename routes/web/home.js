var express = require("express");
var passport = require("passport");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/users");

var router = express.Router();

router.get("/", function(req, res){
    console.log("Im on the basics");
    res.render("home/");
});

router.get("/home", function(req,res){
    res.render("home/home");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

router.get("/posts", ensureAuthenticated, function(req, res){
    res.render("home/posts");
});

router.get("/login", function (req, res) {
    res.render("home/login")
 });

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
 }));

router.get("/signup", function(req,res){
    res.render("home/signup");
});

router.post("/signup", function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function(err, user){
        if(err){return next(err);}
        if(user){
            req.flash("error", "There is an existing account with this email");
            return res.redirect("/signup");
        }

        var newUser = new User({
            username: username,
            password: password,
            email: email
        });

        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect: "/",
    faliureRedirect: "/signup",
    faliureFlash: true
}));


module.exports = router;