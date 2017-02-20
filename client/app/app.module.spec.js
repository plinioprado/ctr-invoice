describe('Controller app:', function() {

   var $rootScope, $cookies, $location, baseService, baseService;
   var controller;

   beforeEach(module('exApp'));
   beforeEach(inject(function(_$controller_, _$rootScope_, _$cookies_, _$location_, _baseService_) {

      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $cookies = _$cookies_;
      $location = _$location_;
      baseService = _baseService_;

      controller = $controller('ExController', {$rootScope, $cookies, $location, baseService});
   }));

   describe('Language', function() {

      it('default should be "pt"', function() {
         expect($rootScope.lang).toBe('pt');
      });
      
   });

   describe('menuUser', function() {

      it('[pt] should be "Usuário"', function() {
         expect(controller.txt['pt'].menuUsers).toBe('Usuários');
      });

      it('[en] should be "Users"', function() {
         expect(controller.txt['en'].menuUsers).toBe('Users');
      });

   });

});