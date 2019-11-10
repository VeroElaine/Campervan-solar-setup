const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');


router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        usernameTaken:false
    });

});

//username already taken
router.get("/new/usernametaken", (req, res) => {
    res.render("users/new.ejs", {
        usernameTaken:true
    });
});

router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if(createdUser){
      req.session.username = createdUser.username;
      req.session.userid = createdUser._id;
      res.redirect('/solar')
    } else {
       res.redirect('/users/new/usernametaken')
    }
  })
})


module.exports = router;
