/*Karz API group project
Ladna and Fiyin
8th January, 2015*/

//Module dependencies
//require mongoose
var mongoose = require('mongoose');

//create Karz schema for our data
var Schema = mongoose.Schema;

//connect to mongolab
mongoose.connect('mongodb://fiyin:andela@ds031561.mongolab.com:31561/Karz');

//test mongoose connection
var Karzdb = mongoose.connection;
Karzdb.on('error', console.error.bind(console, 'connection error:'));
Karzdb.once('open', function (callback) {
  console.log("Connection to Karz database is successful!");
});

//create a new car Schema
var karzSchema = new Schema({
  car_id: Number,
  make: String,
  model: String,
  year: Number,
  style: String,
  image: String,
  colour: String,
  price: Number,
  soldout: Boolean,
  created_at: { type: Date, default: Date.now }
});

//convert karzSchema into a Model we can work with
var Cars = mongoose.model('Cars', karzSchema);

//export Cars model so other files can use it
module.exports = Cars;