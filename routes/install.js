var express = require('express');
var router = express.Router();

var Cnf = require('../models/cnf');
var Recins = require('../models/recins');
var User = require('../models/user');

router.use(function timeLog(req, res, next) {
  console.log('Installing at ', Date.now().toString());
  next();
});

var cb0 = function (req, res, next) {

  console.log('Reinstalling mongodb://localhost/exemplo');

  Cnf
   .remove()
   .exec(console.log('cnf cleared'));

  Recins
   .remove()
   .exec(console.log('recins cleared'));

  User
   .remove()
   .exec(console.log('user cleared'));

  next();
}

var cbCnf = function (req, res, next) {

   var array = [
      {
         entity : {
            name : 'Exemplo Serviços Ltda.',
            cod : '11111111000111',
            shortname : 'Exemplo'
         },
         active: true
      }
   ];

   Cnf
      .create(array, function() {
         console.log('config ok.');
      });

   next();
}
      
var cbRecins = function (req, res, next) {

   var array = [
         {
            cod: 'NF1',
            dt: new Date('2016-01-02'),
            val: 1000,
            cp: {
               cod: '11111111000111',
               name: 'Fulano',
               address: {
                  addr: 'Rua Ipiranga, 111', 
                  neigh: 'Centro',
                  city: 'Sao Paulo',
                  state: 'SP',
                  zip: '11111222'
               }
            },
            std: 'nfs',
            txt: 'Teste',
            recList: [
               {
                  val: 1000,
                  dtdue: new Date('2016-02-2')
               }
            ]
         },
         {
            cod: 'NF2',
            dt: new Date('2016-01-03'),
            val: 1500,
            cp: {
               cod: '22222222000122',
               name: 'Beltrano',
               address: {
                  addr: 'Av.Faria Lima, 2222', 
                  neighborhood: 'Pinheiros',
                  city: 'Sao Paulo',
                  state: 'SP',
                  zip: '33333444'
               }
            },
            std: 'nfs',
            txt: 'Teste2',
            recList: [
               {
                  val: 1000,
                  dtdue: new Date('2016-02-03')
               }
            ]
         },         {
            cod: 'NF3',
            dt: new Date('2016-01-05'),
            val: 800,
            cp: {
               cod: '11111111000111',
               name: 'Fulano',
               address: {
                  addr: 'Rua Ipiranga, 111', 
                  neigh: 'Centro',
                  city: 'Sao Paulo',
                  state: 'SP',
                  zip: '11111222'
               }
            },
            std: 'nfs',
            txt: 'Teste3',
            recList: [
               {
                  val: 400,
                  dtdue: new Date('2016-02-05')
               },
               {
                  val: 400,
                  dtdue: new Date('2016-03-05')
               }
            ]
         },

      ];

   Recins
      .create(array, function() {
         console.log('recins ok');
      });

   next();
}

var cbUser = function (req, res, next) {

   var array = [
      {
         "name" : "Super",
         "email" : "suporte@immaginare.com.br",
         "pass" : "123456",
         "active" : true,
         "std" : "super",
         "fullname" : "Suporte"
      },
      {
         "name" : "João",
         "email" : "joao@exemplo.com.br",
         "pass" : "123456",
         "active" : true,
         "std" : "user",
         "fullname" : "João Silveira"
      },
      {
         "name" : "Maria",
         "email" : "maria@exemplo.com.br",
         "pass" : "123456",
         "active" : true,
         "std" : "user",
         "fullname" : "Maria Silveira"
      }
   ];

   User
      .create(array, function() {
         console.log('user ok');
      });

   next();
}

var cb = function (req, res) {
  res.status(200).send('ok');
}

router.get('/', [cb0, cbCnf, cbUser, cbRecins, cb]);


module.exports = router;

