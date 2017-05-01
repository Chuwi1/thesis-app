// Insert processed log file into database

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('logs/goof.json'));
// var data = JSON.parse(fs.readFileSync('logs/migu.json'));
// var data = JSON.parse(fs.readFileSync('logs/vinlock.json'));

// Change player name accordingly
var MongoClient = require('mongodb').MongoClient; // npm install mongodb
var url = 'mongodb://' + process.env.IP + ':27017/player_01';

MongoClient.connect(url, function(err, db) {
    
    if (err) { 
        return console.dir(err); 
    }

    var collection = db.collection('player_01');
    collection.insert(data)

    db.close();

}); // MongoClient.connect
