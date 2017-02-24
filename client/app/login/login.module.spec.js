describe('Controller login:', function() {

   var $componentController, $scope, $rootScope, $location, baseService;
   var controller;
   var loginMock = {
      status: 200,
      data: {
         entity: {
            cod: '11111111000111',
            name: 'Exemplo Serviços Ltda.',
            shortname: 'Exemplo'
         },
         lang: 'pt-br',
         token: '1',
         user: {
            name: 'João',
            std: 'user'
         }
      }
   };

   beforeEach(module('exApp', 'login'));
   beforeEach(inject(function(_$componentController_, _$location_, _$rootScope_, _$q_) {
      
      $componentController = _$componentController_;
      $location = _$location_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $q = _$q_;

      var bs = {
         login: function(email, pass) {    
            return $q.when(loginMock);
         }
      }
      
      controller = $componentController('login', {$location, $rootScope, $scope, 'baseService': bs});
   }));

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

   it('Default Email should be "joao@exemplo.com.br"', function() {
      expect(controller.email).toBe('joao@exemplo.com.br');
   });

   it('Default Pass should be "123456"', function() {
      expect(controller.pass).toBe('123456');
   });

   it('"Ok" should call loginService.login()', function() {

      var promise = controller.login()
         .then(function(result) {
            expect(result.data).toBe(loginMock.data);
         });
     
   });
   
});