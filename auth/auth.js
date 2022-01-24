//middeware to authenticate login

var ensureAuth = function ensureAuth(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash("info", "You must be logged in to access this page");
        res.redirect("/Login");
    }
}

module.exports = {ensureAuthenticated: ensureAuth}