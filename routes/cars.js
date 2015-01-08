/*Karz API group project
Ladna and Fiyin
7th January, 2015*/

//require express
var express = require('express');

//create a new express router instance
var router = express.Router();

//require body-parser for POST requests
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

//cars data available in Karz shop
var cars = [
             {
              "id": "1",
              "make": "BMW",
              "model": "X5",
              "year": "2015",
              "style": "xDrive35d 4dr SUV AWD (3.0L 6cyl Turbodiesel 8A)",
              "image": "",
              "colour": "white",
              "soldout": false
             },

             {
              "id": "2",
              "make": "MERCEDES-BENZ",
              "model": "SLS AMG GT Final Edition",
              "year": "2015",
              "style": "2dr Convertible (6.2L 8cyl 7AM)",
              "image": "",
              "colour": "red",
              "soldout": false
             },

             {
              "id": "3",
              "make": "TOYOTA",
              "model": "Avalon",
              "year": "2015",
              "style": "XLE Touring SE 4dr Sedan (3.5L 6cyl 6A)",
              "image": "",
              "colour": "grey",
              "soldout": true
             }
           ];

//use the new router instance
//for root requests
router.route('/')
  .get(function (request, response) {
    //test with a GET request
    response.json(cars);
  })
  .post(parseUrlencoded, function (request, response) {
    //test with a POST request
    var newCar = request.body;
    cars.push(newCar);

    response.status(201).json(newCar);
  });

//route to get cars based on car make
router.route('/cars/:make')

  //return car info by make using GET
  .get(function (request, response) {

    var carEntry = parseEntry(request.params.make);
    console.log("car entry: " + carEntry);

    var carMake = cars.filter(function (entry) {
      return entry.make === carEntry;
    });

    if(carMake.length === 0) {
      response.json("No car found with name '" + carEntry + "'");
    }
    else {
      response.json(carMake);
    } 
  })
  .delete(function (request, response) {
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


router.route('/cars/:id/edit')
  //using PUT to update file
  .put(parseUrlencoded, function (request, response) {
    
    var putBody = request.body;
    var carId = request.params.id;

    for(var i in cars) {
      if(cars[i].id === carId) {
        cars[i].make = putBody.make.toUpperCase();
        cars[i].model = putBody.model;
        cars[i].year = putBody.year;
        cars[i].style = putBody.style;
        cars[i].image = putBody.image;
        cars[i].colour = putBody.colour;
        cars[i].soldout = Boolean(putBody.soldout);
        break;
      }
    }
    var editMake = cars.filter(function (editEntry) {
      return editEntry.id === carId;
    });
    response.status(201).json(editMake);
    });

//function to change car make input to first letter uppercase
//and other letters lowercase
function parseEntry(name) {
  var parsedEntry = name.toUpperCase();
  return parsedEntry;
};

//export cars.js for other files to use
module.exports = router;