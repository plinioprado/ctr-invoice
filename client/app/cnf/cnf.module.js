(function() {
   'use strict';

   angular
      .module('cnf', [])
      .component('cnf', {
         templateUrl: 'app/cnf/cnf.template.html',
         controller: CnfController
      });

   CnfController.$inject = ['$rootScope', '$location', 'baseService'];

   function CnfController($rootScope, $location, baseService) {

      var vm = this;

      // Variables

      vm.data = {};
      vm.rw = false;

      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en': {
            edit: 'Edit',
            entity: 'Entity',
            language: 'Language',
            name: 'Full name',
            shortName: 'Short name',
            std: 'Type',
            user: 'User'
         },
         'pt': {
            edit: 'Editar',
            entity: 'Entidade',
            language: 'Idioma',
            name: 'Nome completo',
            shortName: 'Nome',
            std: 'Tipo',
            user: 'Usuário'
         }
      }

      // Functions

      vm.submit = submit;

      activate();

      function activate() {
         vm.data = baseService.configGet();
      }

      function submit() {
         vm.data.lang = vm.lang;
         $rootScope.lang = vm.lang;
         baseService.configSet(vm.data);
         $location.path('#!/');
      }
   }

})();