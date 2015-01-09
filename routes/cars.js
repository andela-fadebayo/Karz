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
      car_id: reqBody.car_id,
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

  //return car info by make using GET
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


  /*.delete(function (request, response) {
    cars  = cars.filter(function (deleteEntry) {
      var carEntry = parseEntry(request.params.make);
      return deleteEntry.make !== carEntry;
    });
      // delete deleteMake;
      //using DELETE to delete file
      // for(var i in cars) {
      //   if(cars[i].make === request.params.make){
      //     if(cache){
      //     response.send("Already Deleted");
      //     }
      //     else {
      //       var cache = cars.splice([i], 1);          
      //     }
      //   }
      // }
    response.sendStatus(200);
  });
*/

router.route('/cars/:id/edit')
  //using PUT to update file
  .put(parseUrlencoded, function (request, response) {
    
    var putBody = request.body;
    var carId = request.params.id;

    // for(var i in cars) {
    //   if(cars[i].id === carId) {
    //     // cars[i].make = putBody.make.toUpperCase();
    //     cars[i].model = putBody.model;
    //     cars[i].year = putBody.year;
    //     cars[i].style = putBody.style;
    //     cars[i].image = putBody.image;
    //     cars[i].colour = putBody.colour;
    //     cars[i].soldout = Boolean(putBody.soldout);
    //     break;
    //   }
    // }
    // var editMake = cars.filter(function (editEntry) {
    //   return editEntry.id === carId;
    // });
    // response.status(201).json(editMake);

    Cars.find({ car_id: carId }, function (err, newId) {
      if (err) return console.error(err);
      response.json(newId);
/*
      var carUpdate = new Cars({
      car_id: reqBody.car_id,
      make: reqBody.make.toUpperCase(),
      model: reqBody.model,
      year: reqBody.year,
      style: reqBody.style,
      image: reqBody.image,
      colour: reqBody.colour,
      price: reqBody.price,
      soldout: Boolean(reqBody.soldout)
    });*/
      
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