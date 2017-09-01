angular
   .module('exApp')
   .config(config);

function config($locationProvider, $routeProvider) {

   $locationProvider.hashPrefix('!');

   $routeProvider
      .when('/', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                   $location.path('/login');
               }
            }
         },            
         template: '<home></home>'
      })
      .when('/cnf', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                   $location.path('/login');
               }
            }
         },            
         template: '<cnf></cnf>'
      })
      .when('/recins', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                   $location.path('/login');
               }
            }
         },
         template: '<recins></recins>'
      })
      .when('/recins/:cod', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                  $location.path('/login');
               }
            }
         },
         template: '<recins-detail></recins-detail>'
      })
      .when('/test', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) $location.path('/login');
            }
         },
         template: '<test></test>'
      })
      .when('/user', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                  $location.path('/login');
               }
            }
         },            
         template: '<user></user>'
      })
      .when('/user/:id', {
         resolve: {
            function($location, $rootScope) {
               if (!$rootScope.token) {
                  $location.path('/login');
               }
            }
         },            
         template: '<user-detail></user-detail>'
      })
      .when('/login', {
         template: '<login></login>'
      })
      .otherwise('/');

   // configure html5 to get links working on jsfiddle
   //$locationProvider.html5Mode(true);

}
