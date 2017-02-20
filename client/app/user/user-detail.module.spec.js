describe('Controller userDetail:', function() {

   var $componentController, $rootScope, $routeParams, $location, dataService;
   var controller;
   var dataMock = {
      status: 200,
      data: {
         "name" : "João", "email" : "joao@exemplo.com.br", "pass" : "123456",
         "active" : true, "std" : "user", "fullname" : "João Silveira"
      }
   }

   beforeEach(module('exApp', 'userDetail'));
   beforeEach(inject(function(_$componentController_, _$location_, _$routeParams_, _$rootScope_, _$q_) {
      
      $componentController = _$componentController_;
      $routeParams = _$routeParams_;
      $rootScope = _$rootScope_;
      $location = _$location_;
      $q = _$q_;

      var ds = {
         httpGet: function() {
            return $q.when(dataMock);
         }
      };

      controller = $componentController('userDetail', {$location, $routeParams, $rootScope, 'dataService': ds});
   }));

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

   it('data should be an empty object', function() {
      expect(controller.data).toEqual({});
   });

   describe('when loaded', function() {

      beforeEach(function() {
         $rootScope.$apply();
      });

      it('data should be a the mock', function() {
         expect(controller.data).toEqual(dataMock.data);
      });

      it('dataActive is the string of data.active', function() {
         controller.dataActive = 'true';
         expect(controller.data.active).toBe(controller.dataActive == 'true');
         controller.dataActive = 'false';
         expect(controller.data.active).toBe(controller.dataActive == 'false');
      });     

   });

});
