const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//db config
const datab = require('./config/keys').MongoURI;

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
var path = require('path');
var routes = require('./routes/index');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// Passport config
require('./config/passport')(passport);


//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');
//html engine
app.engine('html', require('ejs').renderFile);
//Bodyparser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//connect to mongo
mongoose.connect(datab, { useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err =>console.log(err));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//CSS Middleware
app.use(express.static(path.join(__dirname + '/views')));
app.use(express.static(path.join(__dirname, '/public/css')));
//connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/calendar', require('./routes/index'));
app.use('/stats', require('./routes/index'));
app.use('/registration', require('./routes/index'));
app.use('/contact', require('./routes/index'));
app.use('/profile', require('./routes/index'));
app.use('/profileEditor', require('./routes/index'));
app.use('/list', require('./routes/index'));
app.use('/refresh', require('./routes/index'));

//scheduler all inclusive



var db = require('mongoskin').db("mongodb://tdipietro87:tdipietro87@tmcluster-shard-00-00-pbtwu.mongodb.net:27017,tmcluster-shard-00-01-pbtwu.mongodb.net:27017,tmcluster-shard-00-02-pbtwu.mongodb.net:27017/test?ssl=true&replicaSet=TMCluster-shard-0&authSource=admin&retryWrites=true", { w: 0});
	db.bind('event');


		app.use(express.static(path.join(__dirname, 'public')));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		app.get('/init', function(req, res){
			db.event.insert({ 
				text:"My test event A", 
				start_date: new Date(2018,8,1),
				end_date:	new Date(2018,8,5)
			});
			db.event.insert({ 
				text:"My test event B", 
				start_date: new Date(2018,8,19),
				end_date:	new Date(2018,8,24)
			});
			db.event.insert({ 
				text:"Morning event", 
				start_date: new Date(2018,8,4,4,0),
				end_date:	new Date(2018,8,4,14,0)
			});
			db.event.insert({ 
				text:"One more test event", 
				start_date: new Date(2018,8,3),
				end_date:	new Date(2018,8,8),
				color: "#DD8616"
			});

			res.send("Test events were added to the database")
		});


		app.get('/data', function(req, res){
			db.event.find().toArray(function(err, data){
				//set id property for all records
				console.log(err);
				for (var i = 0; i < data.length; i++)
					data[i].id = data[i]._id;
				
				//output response
				res.send(data);
			});
		});


		app.post('/data', function(req, res){
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
				db.event.updateById( sid, data, update_response);
			else if (mode == "inserted")
				db.event.insert(data, update_response);
			else if (mode == "deleted")
				db.event.removeById( sid, update_response);
			else
				res.send("Not supported operation");
		});


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
