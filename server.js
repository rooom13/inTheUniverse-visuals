// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/dj', function homepage(req, res) {
  res.sendFile(__dirname + '/views/dj.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object. [DONE]
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      // TODO: Write other API end-points description here like above [DONE]
      {method: 'POST', path: '/api/books/', description: 'Sumbits a book information'},
      {method: 'PUT', path: '/api/books/:id', description: 'Updates a book information given an id'},
      {method: 'DELETE', path: '/api/books/:id', description: 'Deletes a book information given an id'},
      


    ]
  })
});
// TODO:  Fill the values [DONE]
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Román the not from Rome roman',
    'homeCountry': 'Republic of Undefined',
    'degreeProgram': 'Dealing with life',//informatics or CSE.. etc
    'email': 'romanreypedrero@gmail.com',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Not Rome',
    'hobbies': ['Cloud Computing', 'Cloud Strategy', 'Clothes', 'Actually I prefer sunny days']

  })
});



/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server  on http://localhost:3000/');
});
