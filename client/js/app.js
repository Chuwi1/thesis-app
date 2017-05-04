// Require
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

// App and Server Stuff
var app = express();
var server = http.createServer(app);

// Mongo URL
var url = 'mongodb://' + process.env.IP + ':27017/';

// Player List
var p = ['player_01', 'player_02', 'player_03'];

app.use(express.static('client'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log(addr.address + ": " + addr.port)
  }
);

// Code References 

// collection.aggregate([
//     { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
//     { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1 } }
// ]);

// app.get('/whisper_to/:name', function (req, res) {
//   var name = req.params.name;
//   res.send(name);
// });


// ========
//  Damage
// ========
// save this for daniel to see
// app.get('/damage', function(req, res) {
  
//   var data = [];
//   var connections = 0;
  
// // Player 1
//   MongoClient.connect('mongodb://' + process.env.IP + ':27017/player_01', function(error, db) {

//     // aggregation
//     db.collection('player_01').aggregate([
      
//       // { $match : { $or : [ { damage_inflicted : { $ne : false } }, { damage_received : { $ne : false } } ] } },
//       { $match : { damage_inflicted : { $ne : false } } },
//       { $project : 
//           { 
//             _id : false, 
//             damage_inflicted : 1,
//             // damage_received : 1,
//             // damage_critical : 1,
//             // damage_skill : 1,
//             // damage_target : 1,
//             // damage_target_npc : 1,
//             // damage_target_player : 1,
//             // damage_source : 1,
//             // damage_source_npc : 1,
//             // damage_source_player : 1            
//           }
//       }

//     ]).toArray(function(error, docs) {
      
//       var test = [];
      
//       for (var i = 0; i < docs.length; i++) {
//         test.push(docs[i].damage_inflicted);
//       }
      
//       data[0] = docs;
//       connections++;
//       db.close();
      
//       // check connection
//       if (connections == 1) { 
//         res.json(test);
//       };        
//     });
//   }); // End Player 1
  
// });


// ======
//  Chat
// ======

// Mongo Aggregation
var chat_pipeline = [
  { $match : { $or : [ { whisper_to : { $ne : false } }, { whisper_from : { $ne : false } } ] } },
  { $group : { _id : { to : '$whisper_to', from : '$whisper_from' }, whisper_length : { $push : '$whisper_length' }, time : { $push : '$time' } } }
  // { $group : { _id : { to : '$whisper_to', from : '$whisper_from' }, instances : { $push : { whisper_length : '$whisper_length', time : '$time' } } } },  
];

// Reshape Aggregated Data
function chat_data(d) {
  return d; 
}

// =========
//  Finance
// =========

// Mongo Aggregation
var finance_pipeline = [
  { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
  { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1 } }
];

// Reshape Aggregated Data
function finance_data(d) {
  return d; 
}

// Lookup Tables
// They perform faster than switch and if-else statements
// https://jsperf.com/if-switch-lookup-table/10

// Aggregation Pipeline
var pipeline = {
  '/finance': function() { return finance_pipeline; },
  '/chat': function() { return chat_pipeline; }
};

// Reshape the Data
var reshape = {
  '/finance': function(d) { return finance_data(d); },
  '/chat': function(d) { return chat_data(d); }  
}

// Assign Get Method
app.get('/finance', callback);
app.get('/chat', callback);

function callback(req, res) {

  var res_data = [];
  var conns = 0;
  
  for (var i = 0; i < p.length; i++) {
    MongoClient.connect(url + p[i], function(e, db) {
      console.log(db);
      var index = Number(db.databaseName.split('0')[1]) - 1;
      db.collection(p[index]).aggregate(pipeline[req.url]()).toArray(function(e, d) {
        res_data[index] = reshape[req.url](d);
        db.close();
        conns++;
        check(conns, res, res_data);
      });
    });  
  }

}

// if number of connections to mongo db is 3 (number of players) send stuff over
function check(conns, res, res_data) {
  if (conns == p.length) {
    res.json(res_data);
  }
}

