const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/player');

//welcome Page
router.get('/', (req, res) => res.render('welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

//schedule
router.get('/calendar', ensureAuthenticated, (req, res) => 
    res.render('calendar', {
        name: req.user.name
    }));


//stats
router.get('/stats', ensureAuthenticated, (req, res) => 
    res.render('stats', {
        name: req.user.name
    }));

//registration
router.get('/registration', ensureAuthenticated, (req, res) => 
    res.render('registration', {
        name: req.user.name
    }));

//contact
router.get('/contact', ensureAuthenticated, (req, res) => 
    res.render('contact', {
        name: req.user.name
    }));

//profile
router.get('/profile', ensureAuthenticated, (req, res) => 
    res.render('profile', {
        name: req.user.name
    }));

//profile Editor
router.get('/profileEditor', ensureAuthenticated, (req, res) => 
res.render('profileEditor', {
    name: req.user.name,
    email: req.user.email
}));


// Update Username
router.post('/', ensureAuthenticated, (req, res) => {
    User.findOneAndUpdate({_id:req.user.id},{name: req.body.name},{new: true},(err,doc)=>{
         console.log('#### Updated Record ####',doc);
         res.redirect('/profile');
    });   
  });

module.exports = router;
