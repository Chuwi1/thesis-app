var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');



var app = express();
var server = http.createServer(app);

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.IP + ':27017/player_01';

app.use(express.static('client'));

// Query
app.get('/query', function (req, res) {

  MongoClient.connect(url, function(err, db) {
      
    if (err) { return console.dir(err); }
    
    var collection = db.collection('player_01');
  
    collection.aggregate([
    
        { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
        { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1 } }
    
    ])
    
    .toArray(function(err, docs) {
    
      if (err) {
        console.log(err);   
      } else {
        res.json(docs);
      }
    
      db.close();
    });
  });
  
});

// Items
// app.get('/test', function (req, res) {

//   MongoClient.connect(url, function(err, db) {
      
//       if (err) { return console.dir(err); }
      
//       var collection = db.collection('player_01');

//       collection.aggregate([
      
//           { $match : { item_acquired : { $ne : false } } },
//           { $project : { _id : false, item_acquired : 1, item_quantity : 1 } }
      
//       ])
//       .toArray(function(err, docs) {
        
//         if (err) {
//         console.log(err);   
//         } else {
//           res.json(docs);
//         }
      
//         db.close();
//       });
//   });
// });


// whipsers
// app.get('/test', function (req, res) {
//   MongoClient.connect(url, function(err, db) {
//       if (err) { return console.dir(err); }
//       var collection = db.collection('player_01');
//       collection.aggregate ([
//         { $match : { whisper_from : { $ne : false } } },
//         { $group : { _id : "$whisper_from", messages_received : { $sum : 1 }, timestamps : { $push : "$time" } } }
//       ])
//       .toArray(function(err, docs) {
//           if (err) { 
//               console.log(err);
//           } else {
//             res.json(docs);
//           }
//           db.close();
//         }
//       );
//   });
// });

app.get('/whisper_to/:name', function (req, res) {
  var name = req.params.name;
  res.send(name);
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log(addr.address + ": " + addr.port)
  }
);

app.get('/finance', function (req, res) {

  var res_data = [];
  var num_connections = 0;

  // Player 01
  MongoClient.connect('mongodb://' + process.env.IP + ':27017/player_01', function(err, db) {

    // aggregation
    db.collection('player_01').aggregate([

      { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
      { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1, time : 1 } }
  
    ]).toArray(function(err, docs) {
      
      // insert into array
      res_data[0] = docs;
      num_connections++;
      db.close();
      
      // check connection
      if (num_connections == 3) { 
        res.json(res_data);
      };        
    });
  });
  
  // Player 02
  MongoClient.connect('mongodb://' + process.env.IP + ':27017/player_02', function(err, db) {
    
    // aggregation
    db.collection('player_02').aggregate([

      { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
      { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1, time : 1 } }
  
    ]).toArray(function(err, docs) {
      
      // insert into array
      res_data[1] = docs;
      num_connections++;
      db.close();
      
      // check connection
      if (num_connections == 3) { 
        res.json(res_data);
      };        
    });
  });
  
  // Player 03
  MongoClient.connect('mongodb://' + process.env.IP + ':27017/player_03', function(err, db) {
    
    // aggregation
    db.collection('player_03').aggregate([

      { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
      { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1, time : 1 } }
  
    ]).toArray(function(err, docs) {
      
      // insert into array
      res_data[2] = docs;
      num_connections++;
      db.close();
      
      // check connection
      if (num_connections == 3) { 
        res.json(res_data);
      };        
    });
  });
  
});
