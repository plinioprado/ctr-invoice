# Prototype of Brazilian invoice simulator

This application simulates a simplified portfolio of Brazilian invoices and their generation of account receivables. Compliant with the local legal and banking environment, as well as interfaces easy and familiar for the personnel usually found in the finance department of local companies.

Its part of a set of public protypes intended to test and exchange information about technologies used in Finance internal controls for customers.

### Scope

The bilingual (Portuguese/English) application controls:

* Login (suggesting a demo company)
* Users
* Invoices
* Config (language selected here)

### Stack

Frontend

* AngularJs
* angular-ui-bootstrap
* Bootsrap
* Jquery

Backend

* Node
* Express
* Mongoose
* MongoDb

### Next steps

This application was originally intended to use Gulp. But it would require so many changes in its structure that it's better to use Gulp in a new finance control.

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

### Still in the browser, run the application
```shell
localhost:3000
```

### Configuration
In the file config.json:

* serverPort, default: 3000
* mongooseConnectionString, default: 'mongodb://localhost/exemplo'
* token, defult '123321'

## Tests
-----------
* Available in Jasmine/Karma

## Contribution guidelines
-----------
* We welcome any suggestion

## Who do I talk to? ##

* Plinio Prado
   plinio.prado@immaginare.com.br