describe('Controller app:', function() {

   var $rootScope, $cookies, $location, baseService, baseService;
   var controller;

   beforeEach(module('exApp'));
   beforeEach(inject(function(_$controller_, _$rootScope_, _$cookies_, _$location_, _baseService_) {

      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $rootScope = _$rootScope_;
      $cookies = _$cookies_;
      $location = _$location_;
      baseService = _baseService_;

      controller = $controller('ExController', {$rootScope, $scope, $cookies, $location, baseService});
   }));

   describe('Language', function() {

      it('default should be "pt-br"', function() {
         expect($rootScope.lang).toBe('pt-br');
      });
      
   });

   describe('menuUser', function() {

      it('[pt-br] should be "Usuário"', function() {
         expect(controller.txt['pt-br'].menuUsers).toBe('Usuários');
      });

      it('[en-us] should be "Users"', function() {
         expect(controller.txt['en-us'].menuUsers).toBe('Users');
      });

   });

});