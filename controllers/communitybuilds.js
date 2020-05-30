const express = require('express');
const Community = require('../models/communitybuilds.js');
const User = require("../models/users.js");
const router = express.Router();

router.get('/new', (req, res) => {
    if(req.session.username){
        User.findOne({
            username:req.session.username}, (error, foundUser) => {
                Community.find({userid:req.session.userid}, (error, allCommunity) => {
                    res.render('community/new.ejs',{
                        username:req.session.username,
                        community:allCommunity
                    })
                })
            })

        }else {
               res.redirect('../users/new');
           }
});

router.post('/', (req, res) => {
    let newCommunity = {username:req.session.username, userid:req.session.userid, name:req.body.name, description:req.body.description}
    Community.create(newCommunity, (error, createdCommunity) => {
        res.redirect('/community')
    });
});


router.get('/', (req, res) => {
        Community.find({}, (error, allCommunity) => {
            res.render(
                'community/index.ejs',
                {
                    community:allCommunity,
                    username:req.session.username
                }
            );
        })
});


router.get('/:id/edit', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render('community/edit.ejs',{
            community:foundCommunity
        });
    })
});

router.delete('/:id', (req, res) => {
    Community.findByIdAndRemove(req.params.id, (err, deletedCommunity) => {
        res.redirect('/community');
    })
});

router.get('/:id', (req, res) => {
    Community.findById(req.params.id, (error, foundCommunity) => {
        res.render(
            'community/show.ejs',
            {
                community:foundCommunity
            }
        );
    });
});

router.put('/:id', (req, res) => {
    Community.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/community');
        }
    )
});


module.exports = router;
