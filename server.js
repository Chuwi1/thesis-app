var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);

var data = JSON.parse(fs.readFileSync('logs/player-01.json'));

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.IP + ':27017/player_01';

var from = [];
var to = [];
var whispers = [];

app.use(express.static('client'));

app.get('/test', function (req, res) {

  MongoClient.connect(url, function(err, db) {
      
      if (err) { return console.dir(err); }
      
      var collection = db.collection('player_01');
  
      collection.aggregate ([
        { $match : { whisper_from : { $ne : false } } },
        { $group : { _id : "$whisper_from", messages_received : { $sum : 1 }, timestamps : { $push : "$time" } } }
      ])
      .toArray(function(err, docs) {
          if (err) { 
              console.log(err);
          } else {
            res.json(docs);
          }
        }
      );
      
      db.close();

  });
});

app.get('/whisper_to/:name', function (req, res) {
  var name = req.params.name;
  res.send(name);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log(addr.address + ": " + addr.port)
  }
);