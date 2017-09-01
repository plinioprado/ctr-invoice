(function() {
   'use strict';

   angular
      .module('exApp')
      .service('dataService', dataService);

   dataService.$inject = ['$rootScope', '$cookies', '$http'];

   function dataService($rootScope, $cookies, $http) {

      var service = {
         httpDelete: httpDelete,
         httpFailed: httpFailed,
         httpGet: httpGet,
         httpPost: httpPost,
         httpPut: httpPut
      };

      return service;

      function httpDelete(url) {

         return $http
            .delete(url)
            .then(deleteComplete)
            .catch(service.httpFailed);

         function deleteComplete(response) {
            return response;
         }
      }

      function httpFailed(error) {
         console.log('s-nok');
         console.log(error);
         return { status: 404, data: 'error'};
      }

      function httpGet(url, params) {

         return $http
            .get(url, { params })
            .then(getComplete)
            .catch(service.httpFailed);

         function getComplete(response) {
            if (!angular.isArray(response.data) && !angular.isObject(response.data)) response = { status: 400, data: 'error'};
            return response;
         }
      }

      function httpPost(url, data) {
       
         return $http.post(url, data)
            .then(function(response) {
               console.log('s-ok');
               console.log(response);
               return response;
            }, 
               function(error) {
               return httpFail(error)
            });
      }

      function httpPut(url, data) {
       
         return $http.put(url, data)
            .then(putComplete)
            .catch(service.httpFailed);

         function putComplete(response) {
            return response;
         }
      }
      
   }

})();