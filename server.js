// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/src'));



/*
 * HTML Endpoint
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server  on http://localhost:3000/');
});
