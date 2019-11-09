const express = require('express');
const Community = require('../models/solar.js');
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('community/new.ejs');
});

router.post('/', (req, res) => {
    Community.create(req.body, (error, createdCommunity) => {
        res.redirect('community/new');
    });
});


module.exports = router;
