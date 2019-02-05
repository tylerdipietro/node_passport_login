const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const User = require('../models/player');
var path = require('path');
var bodyParser = require('body-parser');

//welcome Page
router.get('/', (req, res) => res.render('welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

//schedule
router.get('/calendar', ensureAuthenticated, function(req, res){

    var db = require('mongoskin').db("mongodb://tdipietro87:tdipietro87@tmcluster-shard-00-00-pbtwu.mongodb.net:27017,tmcluster-shard-00-01-pbtwu.mongodb.net:27017,tmcluster-shard-00-02-pbtwu.mongodb.net:27017/test?ssl=true&replicaSet=TMCluster-shard-0&authSource=admin&retryWrites=true", { w: 0});
    db.bind('calendar');
    
    var Calendar = require('../models/calendar');
    console.log(req.user.id);
    
    Calendar.find({user: req.user.id}) // query by specific user
  .then(function (data) {
    // ...
  

		router.use(express.static(path.join(__dirname, 'public')));
		router.use(bodyParser.json());
		router.use(bodyParser.urlencoded({ extended: true }));

		router.get('/init', function(req, res){
			db.calendar.insert({ 
				text:"My test event A", 
				start_date: new Date(2018,8,1),
				end_date:	new Date(2018,8,5)
			});
			db.calendar.insert({ 
				text:"My test event B", 
				start_date: new Date(2018,8,19),
				end_date:	new Date(2018,8,24)
			});
			db.calendar.insert({ 
				text:"Morning event", 
				start_date: new Date(2018,8,4,4,0),
				end_date:	new Date(2018,8,4,14,0)
			});
			db.calendar.insert({ 
				text:"One more test event", 
				start_date: new Date(2018,8,3),
				end_date:	new Date(2018,8,8),
				color: "#DD8616"
			});

			res.send("Test events were added to the database")
		});


		router.get('/data', function(req, res){
			db.calendar.find().toArray(function(err, data){
				//set id property for all records
				console.log(err);
				for (var i = 0; i < data.length; i++)
					data[i].id = data[i]._id;
				
				//output response
				res.send(data);
			});
		});


		router.post('/data', function(req, res){
			var data = req.body;
			var mode = data["!nativeeditor_status"];
			var sid = data.id;
			var tid = sid;

			delete data.id;
			delete data.gr_id;
			delete data["!nativeeditor_status"];


			function update_response(err, result){
				if (err)
					mode = "error";
				else if (mode == "inserted")
					tid = data._id;

				res.setHeader("Content-Type","application/json");
				res.send({action: mode, sid: sid, tid: tid});
			}

			if (mode == "updated")
				db.calendar.updateById( sid, data, update_response);
			else if (mode == "inserted")
				db.calendar.insert(data, update_response);
			else if (mode == "deleted")
				db.calendar.removeById( sid, update_response);
			else
				res.send("Not supported operation");
		});
    
    
    res.render('calendar', {
        name: req.user.name
    })
});
});

//list view schedule
router.get('/list', ensureAuthenticated, (req, res) => 
    res.render('list', {
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
