(function() {
   'use strict';

   angular
     .module('exApp', [
         'ngAnimate',
         'ngRoute',
         'ngCookies',
         'ui.bootstrap',
         'ui.bootstrap.datepickerPopup',
         'tmh.dynamicLocale',

         'uibdatepicker',
         'cnf',
         'home',
         'login',
         'test',
         'user',
         'userDetail',
         'recins',
         'recinsDetail'
        ])
      .controller('ExController', ExController);

   ExController.$inject = ['$scope', '$rootScope', '$cookies', '$location', 'baseService', 'tmhDynamicLocale'];

   function ExController($scope, $rootScope, $cookies, $location, baseService, tmhDynamicLocale) {

      var vm = this;

      $rootScope.config = {};
      $rootScope.lang = 'pt';

      vm.menuUsers = $rootScope.lang == 'en' ?  'Users' : 'Usuários';

      // Texts

      vm.txt = {
         'en': {
            menuInvoices: 'Invoices',
            menuUsers: 'Users',
         },
         'pt': {
            menuInvoices: 'Faturas',
            menuUsers: 'Usuários',
         }
      }

      // Functions

      vm.getToken = getToken;
      vm.logout = logout;

      activate();

      function activate() {

         if (!$rootScope.config) $rootScope.config = {};
         $rootScope.lang = ($cookies.get('lang') == 'en') ? 'en' : 'pt';
         tmhDynamicLocale.set('pt-br');
         $rootScope.token = ( $cookies.get('token') || undefined);
         $rootScope.userName = ( $cookies.get('userName') || undefined);
         $rootScope.userStd = ( $cookies.get('userStd') || undefined);
      }

      function getToken() {
         return $rootScope.token;
      }

      function logout() {
         
         baseService.logout();
         $location.path('#!/');
      }
   }

})();

