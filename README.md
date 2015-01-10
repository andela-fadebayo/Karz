#KARZ

Karz API. Add, View, Edit and Delete cars information in Karz Online Shop. Andela group API project (Ladna and Fiyin). 7th January, 2015.

For more information and complaints, contact 
<img src="https://avatars2.githubusercontent.com/u/9654451?v=3&s=200">
<a href="mailto:fiyinfoluwa.adebayo@andela.co">Fiyin Adebayo</a>

<img src="https://avatars2.githubusercontent.com/u/9106885?v=3&s=200">
<a href="mailto:ladna.meke@andela.co">Ladna Meke</a>


##KARZ SHOP

This is a description of Karz API.

Get info on cars available in the Karz Shop. You can add, update, view cars and delete cars info.

Application is done with Express.js v~4.0.0, and Mongoose v~3.6.13

##Prerequisites to run Karz API locally on your machine:
*Clone Karz API from https://github.com/andela-fadebayo/Karz.git

*Make sure you have node installed on your machine. You can get node from https://nodejs.org

*Download Mongo from http://www.mongodb.org/

*Run '$ npm install' to install all dependencies in package.json

*Make sure that mongod is running

*run $ node server.js


##ENDPOINTS

###Root Endpoint

https://andela-karz.herokuapp.com/

###List all cars:
  method: GET 
  /cars

###Get a particular car by make:
    method: GET
    /cars/make

###Add car to cars database
    method: POST
    /cars
    
    parameters: {
        make: a string (required)
        model: a string (required)
        year: integer (required)
        style: string (required)
        image: image url in string form (optional)
        colour: string (required)
        price: integer (required)
        soldout: true/false (required)
    }

###Edit car details
    method: PUT 
    /cars/id/edit
    parameters: {
        make: a string (required)
        model: a string (required)
        year: integer (required)
        style: string (required)
        image: image url in string form (optional)
        colour: string (required)
        price: integer (required)
        soldout: true/false (required)
    }

###Delete a car by id
    method: DELETE
    /cars/id

Good Luck!!!
