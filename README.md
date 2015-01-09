# Karz
Karz API. Add, View, Edit and Delete cars information in Karz Online Shop. Andela group API project (Ladna and Fiyin). 7th January, 2015.

##KARZ SHOP

Get info on cars available in the Karz Shop. You can add cars, update car info, and view cars.

Appliccation is done with Express.js v~4.0.0, and Mongoose v~3.6.13

Full source code is available at github.com/andela-fadebayo/Karz.\

##Prerequisite
*Make sure you have node installed on your machine. You can get node from https://nodejs.org

*Download Mongo 

*Run npm install to install all dependencied in the package.json

*Make sure that mongod is running


##ENDPOINTS
###List all cars:
  GET /cars

###Get a particular car by make:
    GET /cars/:make

###Add car to the cars array
    POST /cars

###Edit car details
    PUT /cars/:id/edit
