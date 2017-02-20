# Prototype of Brazilian invoice simulator [under development]

This application simulates a simplified portfolio of Brazilian invoices and their generation of account receivables. Compliant with the local legal and banking environment, as well as interfaces easy and familiar for the personnel usually found in the finance department of local companies.

It's also the core for a connection between business administration softwares and other financial controls.

### Scope

The bilingual (Portuguese/English) application controls:

* Login (suggesting a demo company)
* Users
* Invoices
* Config

### Stack

Frontend

* AngularJs
* Jquery
* Bootsrap

Backend

* Node
* Express
* Mongoose
* MongoDb

### Next steps

* Implement Gulp
* Improvement in datepickers and tests 
* Other expansions

## Set up
-----------

### If Mongodb not installed, install it

### Download files to the working folder

### Install the application and run Node
```shell
$ npm install
$ node index
```

### Open browser and create default database
```shell
localhost:3000/api/install
// This url will reset the original database at any time
```

### Run the application
```shell
localhost:3000/
```

### Configuration
In the file config.json:

* serverPort, default: 3000
* mongooseConnectionString, default: 'mongodb://localhost/exemplo'

## Tests
-----------
* Available in Jasmine/Karma

## Contribution guidelines
-----------
* We welcome any suggestion

## Who do I talk to? ##

* Plinio Prado
* plinio.prado@immaginare.com.br