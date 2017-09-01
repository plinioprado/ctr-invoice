(function() {
   'use strict';

   angular
      .module('recins', [])
      .component('recins', {
         templateUrl: 'app/recins/recins.template.html',
         controller: RecInsController,
         controllerAs: 'vm'
         });

   RecInsController.$inject = ['$scope', '$rootScope', '$location', '$filter', 'dataService'];

   function RecInsController($scope, $rootScope, $location, $filter, dataService) {

      var vm = this;

      // Variables

      vm.activated = false;
      vm.apiUrl = '/api/recins';

      vm.dt0;
      vm.dtn;
      vm.dateFormat;
      
      vm.list = [];

      vm.searchText = '';
      vm.searchCol = '';
      vm.search = search;

      vm.sortCol = ['cod'];
      vm.reverseSort = false;
     
      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            all: 'All',
            invoices: 'Invoices and revenues',
            customer: 'Customer',
            date: 'Date',
            insert: 'Insert',
            in: 'in',
            value: 'Value'
         },
         'pt-br': {
            all: 'Todos',
            invoices: 'Faturas e receitas',
            customer: 'Cliente',
            date: 'Data',
            in: 'em',
            insert: 'Incluir',
            value: 'Valor'
         }
      }

      // Functions

      vm.dataGet = dataGet;
      vm.ins = ins;

      vm.sortGetClass = sortGetClass;
      vm.sortData = sortData;

      vm.totVal = totVal;

      activate();

      $scope.$watch(function () {
         return vm.dt0;
      }, function(current, original) {
         if (vm.activated) vm.dataGet();
      });

      $scope.$watch(function () {
         return vm.dtn;
      }, function(current, original) {
         if (vm.activated) vm.dataGet();
      });

      function activate() {
         var today = new Date();
         vm.dt0 = new Date(today.getFullYear()-1, 0, 1);
         vm.dtn = new Date(today.getFullYear()+1, 11, 0);
         vm.dateFormat = $rootScope.lang == 'en-us' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
         vm.dataGet();
         vm.activated = true;
      }

      function dataGet() {

         vm.list = [];

         var dt0 = $filter('date')(vm.dt0, 'yyyy-MM-dd', 'UTC');
         var dtn = $filter('date')(vm.dtn, 'yyyy-MM-dd', 'UTC');

         if (!dt0 || !dtn) return;

         var params = {
            'dt0': dt0,
            'dtn': dtn
         }

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
            console.log('c-nok(rid)');
            console.log(error);
            vm.msg = (error.data == 'error' || !angular.isString(error.data)) ? 'Erro' : 'Erro (' + error.data + ')';
         }
      }

      function ins() {
         $location.path('recins/0');
      }

      function search(item) {

         var dt = $filter('date')(item.dt, 'yyyy-MM-dd', 'UTC');

         if (vm.searchText == '') {
            return true;
         } else if (item.cod.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1 &&
            (vm.searchCol == '' || vm.searchCol == 'cod') ) {
            return  true;
         } else if (item.cp.cod.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1 &&
            (vm.searchCol == '' || vm.searchCol == 'cp.cod') ) {
            return  true;
         } else if (item.cp.name.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1 &&
            (vm.searchCol == '' || vm.searchCol == 'cp.name') ) {
            return  true;
         } else if (dt.indexOf(vm.searchText) != -1 &&
            (vm.searchCol == '' || vm.searchCol == 'dt') ) {
            return  true;
         } else if (item.val.toString().replace('.',',').indexOf(vm.searchText) != -1 &&
            (vm.searchCol == '' || vm.searchCol == 'val') ) {
            return  true;
         }

         return false;
      }

      function sortData(colString) {

        var col = colString.split(',');
        vm.reverseSort = (JSON.stringify(vm.sortCol) == JSON.stringify(col)) ? !vm.reverseSort : false;
        vm.sortCol = col;
      }

      function sortGetClass(colString) {

         var col = colString.split(',');
         if (JSON.stringify(vm.sortCol) == JSON.stringify(col)) {
            return vm.reverseSort ? 'arrow-down' : 'arrow-up';
         }
         return '';
      }

      function totVal() {

         vm.totval = 0;
         for (var key in vm.list) {
            var item = vm.list[key];
            if (this.search(item)) {
                vm.totval += Number(item.val);
            }
         }
         return Math.round(vm.totval * 100) / 100;
      }
      
   }

})();
