(function() {
   'use strict';

   angular
      .module('cnf', [])
      .component('cnf', {
         templateUrl: 'app/cnf/cnf.template.html',
         controller: CnfController,
         controllerAs: 'vm'
      });

   CnfController.$inject = ['$rootScope', '$location', 'baseService', 'tmhDynamicLocale'];

   function CnfController($rootScope, $location, baseService, tmhDynamicLocale) {

      var vm = this;

      // Variables

      vm.data = {};
      vm.rw = false;

      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            edit: 'Edit',
            entity: 'Entity',
            language: 'Language',
            name: 'Full name',
            shortName: 'Short name',
            std: 'Type',
            user: 'User'
         },
         'pt-br': {
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
         var l = vm.lang == 'pt-br' ? 'pt-br' : 'en-us';
         tmhDynamicLocale.set(l);
         
         baseService.configSet(vm.data);
         $location.path('#!/');
      }
   }

})();