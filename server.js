/*Karz API group project
Ladna and Fiyin
7th January, 2015*/

//require express
var express = require('express');

//create a new instance of express and assign to 'app'
var app = express();

//require cars route file for use here
var carsRoutes = require('./routes/cars');

//use this route for cars routes
app.use('/', carsRoutes);
app.use('/cars/:make', carsRoutes);
app.use('/cars/:id/edit', carsRoutes);

//Allow for cross domain and access to others
var allowCrossDomain = function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  next();
};

app.use(allowCrossDomain);

//listen for server.js on port 3000
app.listen(3000, function() {
  console.log("Karz is listening on port 3000");
});