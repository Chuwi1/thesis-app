## Thesis App
This repository contains updates and notes for the visualiztion app

## Key files

#### [parser.js](https://github.com/neuralism/thesis-app/blob/master/parser.js)
- Parses player log file based on specificed ruleset into JSON file
- Checks one-word names against list of monsters with one-word names
- Requests item names from [NotAion API](http://api.notaion.com/) (per 0.5s) as they are not in the log file

#### [monster.js](https://github.com/neuralism/thesis-app/blob/master/monster.js)
- Generates a [JSON file](https://raw.githubusercontent.com/neuralism/thesis-app/master/lists/single-name-monsters.json) containing a list of monsters with one-word names 
- JSON is generated from a [list](https://github.com/neuralism/thesis-app/blob/master/lists/monster-list.txt) containing every monster's name scraped from [aiondatabase.net](http://aiondatabase.net)

#### [insert.js](https://github.com/neuralism/thesis-app/blob/master/insert.js)
- Inserts processed log file into Mongo database

#### [server.js](https://github.com/neuralism/thesis-app/blob/master/server.js)
- Listens for requests and queries database for a slice of the data
- Transforms requested data and sends it over to the client

