(function() {
   'use strict';
   
   angular
      .module('user', [])
      .component('user', {
         templateUrl: 'app/user/user.template.html',
         controller: UserController,
         controllerAs: 'vm'
      });

   UserController.$inject = ['$rootScope', '$location', 'dataService'];

   function UserController($rootScope, $location, dataService) {

      var vm = this;

      // Variables

      vm.apiUrl = '/api/user';
      vm.list = [];

      vm.msg = '';

      vm.reverseSort = false;
      vm.sortCol = ['email'];
      vm.searchText = '';

      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            active: 'Active',
            insert: 'Insert',
            name: 'Name',
            no: 'No',
            search: 'Search',
            std: 'Std',
            users: 'Users',
            yes: "Yes"
         },
         'pt-br': {
            active: 'Ativo',
            insert: 'Incluir',
            name: 'Nome',
            no: 'Não',
            search: 'Busca',
            std: 'Tipo',
            users: 'Usuários',
            yes: "Sim"
         }
      }

      // Functions

      vm.ins = ins;
      vm.sortData = sortData;
      vm.getSortClass = getSortClass;

      activate();

      function activate() {
         dataGet();
      }

      function dataGet() {

         var params = {};

         return dataService.httpGet(vm.apiUrl, params)
            .then(getComplete)
            .catch(dataFailed);

         function getComplete(response) {
            if (response.status == 200) {
               vm.list = response.data;
            } else {
               dataFailed(response);
            }
         }

         function dataFailed(error) {
            console.log('c-nok(u)');
            console.log(error);
            vm.msg = (error.data == 'error' || !angular.isString(error.data)) ? 'Erro' : 'Erro (' + error.data + ')';
         }
      }

      function ins() {
         $location.path('/user/0');
      }

      function sortData(colString) {

         var col = colString.split(',');
         vm.reverseSort = (JSON.stringify(vm.sortCol) == JSON.stringify(col)) ? !vm.reverseSort : false;
         vm.sortCol = col;

      }

      function getSortClass(colString) {

         var col = colString.split(',');
         if (JSON.stringify(vm.sortCol) == JSON.stringify(col)) {
             return vm.reverseSort ? 'arrow-down' : 'arrow-up';
         }

         return '';
      }
   }

})();