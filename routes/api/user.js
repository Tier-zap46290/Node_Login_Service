var express = require("express");
var router = express.Router();

router.get("/", function(req,res){
    res.json("This is a JSON status");
});

module.exports = router;