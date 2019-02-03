var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();

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


app.listen(3000);