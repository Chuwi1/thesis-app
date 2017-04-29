## Thesis App
This repository contains updates and notes for the visualiztion app

## Key files

#### [parser.js](https://github.com/neuralism/thesis-app/blob/master/parser.js)
- Parses log file based on specificed ruleset into readable JSON file

#### [insert.js](https://github.com/neuralism/thesis-app/blob/master/insert.js)
- Inserts processed log file into Mongo database

#### [server.js]((https://github.com/neuralism/thesis-app/blob/master/server.js))
- Listens for requests and queries database for a slice of the data
- Transforms requested data and sends it over to the client

