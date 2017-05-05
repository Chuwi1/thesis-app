// Insert processed log file into database

var fs = require('fs');

var data = JSON.parse(fs.readFileSync('logs/goof.json'));
var player = 'player_01';

// var data = JSON.parse(fs.readFileSync('logs/migu.json'));
// var player = 'player_02';

// var data = JSON.parse(fs.readFileSync('logs/applied.json'));
// var player = 'player_03';

// Dropping Vinlock from the visualization. Too little data.
// var data = JSON.parse(fs.readFileSync('logs/vinlock.json'));
// var player = 'player_03';



// Change player name accordingly
var MongoClient = require('mongodb').MongoClient; // npm install mongodb
var url = 'mongodb://' + process.env.IP + ':27017/' + player;

MongoClient.connect(url, function(err, db) {
    
    if (err) { 
        return console.dir(err); 
    }

    var collection = db.collection(player);
    collection.insert(data)

    db.close();

}); // MongoClient.connect
