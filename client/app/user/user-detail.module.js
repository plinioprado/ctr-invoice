(function() {
   'use strict';

   angular
      .module('userDetail', [])
      .component('userDetail', {
         templateUrl: 'app/user/user-detail.template.html',
         controller: UserDetailController,
         controllerAs: 'vm'
      });

   UserDetailController.$inject = ['$location', '$routeParams','$rootScope', 'dataService'];

   function UserDetailController($location, $routeParams, $rootScope, dataService) {

      var vm = this;

      // Variables

      vm.apiUrl = '/api/user';

      vm.data = {};
      vm.dataActive = '';
      vm.dataId = '';

      vm.edit = $routeParams.id == 0 ? true : false;
      vm.submitted = false;
      vm.msg = '';
 
      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            active: 'Active',
            back: 'Back',
            delete: 'Delete',
            empty: 'Empty',
            edit: 'Edit',
            fullName: 'Full name',
            invalid: 'Invalid',
            less3: 'Less than 3 characters',
            less6: 'Less than 6 characters',
            name: 'Name',
            no: 'No',
            pass: 'Pass',
            std: 'Std',
            user: 'User',
            yes: "Yes"
         },
         'pt-br': {
            active: 'Ativo',
            back: 'Retornar',
            delete: 'Excluir',
            empty: 'Em branco',
            edit: 'Editar',
            fullName: 'Nome completo',
            invalid: 'Inválido',
            less3: 'Menos de 3 caracteres',
            less6: 'Menos de 6 caracteres',
            name: 'Nome',
            no: 'Não',
            pass: 'Senha',
            std: 'Tipo',
            user: 'Usuário',
            yes: "Sim"
         }
      }

      // functions

      vm.back = back;

      vm.dataDelete = dataDelete;
      vm.dataComplete = dataComplete;
      vm.dataFailed = dataFailed;
      vm.dataGet = dataGet;
      vm.dataSubmit = dataSubmit;

      vm.onDataActiveChange = onDataActiveChange;

      activate();

      function activate() {
         dataGet();
      }

      function back() {
         $location.path('/user');
      }

      function dataComplete(response) {

         if (response.status == 200) {
            $location.path('/user');
         } else {
            vm.httpFailed(response);
         }
      }

      function dataFailed(error) {

         console.log('c-nok(ud)');
         console.log(error);
         vm.msg = (error.data == 'error' || !angular.isString(error.data)) ? 'Erro' : 'Erro (' + error.data + ')';
      }

      function dataGet() {

         return dataService.httpGet(vm.apiUrl + '/' + $routeParams.id, {})
            .then(dataGetComplete)           
            .catch(vm.dataFailed);

         function dataGetComplete(response) {
            if (response.status == 200) {
               vm.data = response.data;
               vm.dataActive = vm.data.active.toString();
               vm.dataId = response.data._id == '0' ? 'Novo' : response.data._id;
            } else {
               vm.dataFailed(response);
            }
         }
      }

      function dataSubmit() {

         vm.submitted = true;

         if (vm.data._id == '0') {

            dataService.httpPost(vm.apiUrl, vm.data)
               .then(vm.dataComplete)
               .catch(vm.dataFailed);

         } else {

            var url = (vm.apiUrl + '/' + data._id);
            delete data._id;

            dataService.httpPut(url, vm.data)
               .then(vm.dataComplete)
               .catch(vm.dataFailed);  
         }
      }

      function dataDelete() {

         if (vm.data._id == '0') return;

         dataService.httpDelete(vm.apiUrl + '/' + vm.data._id)
            .then(vm.dataComplete)
            .catch(vm.dataFailed);
      }

      function onDataActiveChange() {
         vm.data.active = (vm.dataActive == 'true');
      }

   }

})();
