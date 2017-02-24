(function() {
   'use strict';

   angular
      .module('exApp')
      .service('baseService', baseService);

   baseService.$inject = ['$rootScope', '$cookies', '$http'];

   function baseService($rootScope, $cookies, $http) {

      var service = {
         configGet: configGet,
         configSet: configSet,
         dtStr2date: dtStr2date,
         langGet: langGet,
         langSet: langSet,
         tablesGet: tablesGet,
         logout: logout,
         tokenGet: tokenGet
      };

      return service;

      function tablesGet() {
         var tables = {
            'pt-br': {
               recinsStdList: {
                  nfs: 'NF.Serviços',
                  nfm: 'NF.Mercadoria',
                  nd: 'N.Débito',
                  rc: 'Recibo'
                  },
               addrStateList: [
                  '', 'AC', 'AL', 'AP', 'AM', 'BA',
                  'CE', 'DF', 'ES', 'GO', 'MA',
                  'MT', 'MS', 'MG', 'PA', 'PB',
                  'PR', 'PE', 'PI', 'RJ', 'RN',
                  'RS', 'RO', 'RR', 'SC', 'SP',
                  'SE', 'TO', 
                  ]
               },
            'en-us': {
               recinsStdList: {
                  nfs: 'Service invoice',
                  nfm: 'Produce invoice',
                  nd: 'Debit note',
                  rc: 'Receipt'
                  },
               addrStateList: [
                  '', 'AC', 'AL', 'AP', 'AM', 'BA',
                  'CE', 'DF', 'ES', 'GO', 'MA',
                  'MT', 'MS', 'MG', 'PA', 'PB',
                  'PR', 'PE', 'PI', 'RJ', 'RN',
                  'RS', 'RO', 'RR', 'SC', 'SP',
                  'SE', 'TO'
                  ]
            }
         };
         return tables;
      }

      function configGet() {

         var config = JSON.parse($cookies.get('config') || {});
         config.lang = $rootScope.lang;
         return config;
      }

      function configSet(config) {
         $cookies.put('config', JSON.stringify(config));
         $cookies.put('token', config.token);
         $cookies.put('userName', config.user.name);
         $cookies.put('userStd', config.user.std);
      }

      function dtStr2date(str) {

         try {
            var offset = new Date().getTimezoneOffset()/60;
            var dt = new Date(str);
            dt.setHours(dt.getHours() + offset);
            return dt;            
         } catch(err) {
            return null;
         }
      }

      function langGet() {
         
         var lang = $cookies.get('lang');
         if (lang != 'en-us') lang = 'pt-br';
         return lang;
      }

      function langSet(lang) {
         if (lang != 'en-us') lang = 'pt-br';
         $cookies.put('lang', lang);
      }

      function logout() {

         $cookies.remove('config');
         $cookies.remove('token');
         $cookies.remove('userName');
         $cookies.remove('userStd');
         $rootScope.token = undefined;
         $rootScope.userName = undefined;
         $rootScope.userStd = undefined;
      }

      function tokenGet() {
         return ( $cookies.get('token') || '');
      }

   }

})();