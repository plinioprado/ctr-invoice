(function() {
   'use strict';

   angular
       .module('home', [])
       .component('home', {
          templateUrl: 'app/home/home.template.html',
          controller: HomeController
       });

   HomeController.$inject = ['$rootScope'];

   function HomeController($rootScope) {

      var vm = this;

      // Texts

      vm.lang;
      vm.txt = {
         'en': {
            li1: 'Bilingual (en,pt)',
            p1: 'Prototype for tests and information exchange',
            
            currentScope: 'Current scope',
            technologies: 'Technologies',
            users: 'Users'
         },
         'pt': {
            li1: 'Bilingue (pt,en)',
            p1: 'Protótipo para testes e trocas de informação',
            
            currentScope: 'Escopo atual',
            technologies: 'Tecnologias',
            users: 'Usuários'
         }
      };

      activate();

      function activate() {
         vm.lang = $rootScope.lang;
      }

      vm.test = 'hey';
      
   }

})();