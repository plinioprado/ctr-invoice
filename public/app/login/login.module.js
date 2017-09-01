(function() {
   'use strict';

   angular
      .module('login', [])
      .component('login', {
         templateUrl: 'app/login/login.template.html',
         controller: LoginController,
         controllerAs: 'vm'
      });

   LoginController.$inject = ['$scope', '$rootScope', '$location', 'baseService', 'dataService'];

   function LoginController($scope, $rootScope, $location, baseService, dataService) {

      var vm = this;

      vm.config;
      vm.email = 'joao@exemplo.com.br';
      vm.msg = '';
      vm.pass = '123456';
      vm.submitted = false;

      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            pass: 'Pass',
            empty: 'Empty',
            error400: 'Access error',
            error403: 'Invalid login',
            invalid: 'Invalid',
            less6: 'Less than 6 characters',
            typeEmail: 'Type your email',
            typePass: 'Type your pass'
         },
         'pt-br': {
            pass: 'Senha',
            empty: 'Em branco',
            error400: 'Erro ao acessar',
            error403: 'Login inválido',
            invalid: 'Inválido',
            less6: 'Menos de 6 caracteres',
            typeEmail: 'Digite seu email',
            typePass: 'Digite sya senha'
         }
      }

      // Functions

      vm.ok =  ok;
      vm.login = login;
      vm.loginComplete = loginComplete;
      vm.loginFailed = loginFailed;

      function ok() {

         if($scope.form.$invalid) return;
         vm.login();
      }

      function login() {

         var data = {
            email: vm.email,
            pass: vm.pass
         };

      // New

      return dataService.httpPost('/api/login', data)
         .then(vm.loginComplete)           
         .catch(vm.loginFailed);
      }

      function loginComplete(response) {

         if (response.status == 200) {

            vm.config = response.data;
            if (vm.config && vm.config.user) $rootScope.userName = vm.config.user.name ;

            baseService.configSet(response.data);
            $rootScope.token = ( response.data.token || undefined);
            $rootScope.userName = ( response.data.user.name || undefined);
            $rootScope.userStd = ( response.data.user.std || undefined);
            $location.path('#!/');

         } else  if (response.status == 403) {
            vm.msg = vm.txt[vm.lang].error403;
         } else {
            vm.msg = vm.txt[vm.lang].error400;
         }               
      }

      function loginFailed(error) {

         console.log('c-nok(l)');
         console.log(error);
         vm.msg = (error.data == 'error' || !angular.isString(error.data)) ? 'Erro' : 'Erro (' + error.data + ')';
      }
   }

})();