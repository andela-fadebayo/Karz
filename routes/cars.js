/*Karz API group project
Ladna and Fiyin
7th January, 2015*/

//require express
var express = require('express');

//require karz mongoose db
var Cars = require('./../config/db');

//create a new express router instance
var router = express.Router();

//require body-parser for POST requests
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

//use the new router instance
//for root requests
router.route('/')
  .get(function (request, response) {
    //test with a GET request
    //read all cars in cars collection and show on our page
    Cars.find(function (err, data) {
      if (err) return console.error(err);
      response.json(data);
      });
  })

  .post(parseUrlencoded, function (request, response) {
    
    //grab POST request data
    var reqBody = request.body;
    var newCar = new Cars({
      make: reqBody.make.toUpperCase(),
      model: reqBody.model,
      year: reqBody.year,
      style: reqBody.style,
      image: reqBody.image,
      colour: reqBody.colour,
      price: reqBody.price,
      soldout: Boolean(reqBody.soldout)
    });

    //insert newCar schema into Karz database
    newCar.save(function (err, newSave) {
      if (err) return console.error(err);
      response.status(200).json('new car ' + reqBody.make + ' saved!');
    });
  });

router.route('/cars')
.get(function (request, response) {
  response.redirect('/');
});

//route to get cars based on car make
router.route('/cars/:make')
  .get(function (request, response) {

    var carEntry = parseEntry(request.params.make);

    Cars.find(function (err, data) {
      if(err) return console.error(err);
      var carMake = data.filter(function(entry) {
        return entry.make === carEntry;
      });
        if(carMake.length === 0) {
          response.json("No car found with name '" + carEntry + "'");
        }
        else {
          response.json(carMake);
        }        
    });     
  })

router.route('/cars/:id/edit')
  //using PUT to update file
  .put(parseUrlencoded, function (request, response) {

    var putBody = request.body;

    Cars.findById(request.params.id, function (err, kar) {
      
      if (err) {
        response.send(err);
      }
      else {
        kar.make = kar.make || request.body.make.toUpperCase();
        kar.model = putBody.model || kar.model;
        kar.year = putBody.year || kar.year;
        kar.style = putBody.style || kar.style;
        kar.image = putBody.image || kar.image;
        kar.colour = putBody.colour || kar.colour;
        kar.price = putBody.price || kar.price;
        kar.soldout = Boolean(putBody.soldout) || kar.soldout;

        //save the edited copy
        kar.save(function (err){
          if (err) response.send(err);
          response.status(200).json(kar.make + " updated!");
        });
      }
    });
  });

router.route('/cars/:id')
   .delete(function (request, response) {
      Cars.remove({ _id: request.params.id }, function (err, kar) {
        if (err) response.send(err)
        response.json({ message: 'Delete Successful!'});
      });
  });    

//function to change car make input to first letter uppercase
//and other letters lowercase
function parseEntry(name) {
  var parsedEntry = name.toUpperCase();
  return parsedEntry;
};

//export cars.js for other files to use
module.exports = router;