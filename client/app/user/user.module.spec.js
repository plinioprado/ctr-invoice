describe('Controller user: ', function() {

   var $componentController, $rootScope, $location, dataService;
   var controller;
   var listMock = {
      status: 200,
      data: [
         {
            "name" : "Super", "email" : "suporte@immaginare.com.br", "pass" : "123456",
            "active" : true, "std" : "super", "fullname" : "Suporte"
         },
         {
            "name" : "João", "email" : "joao@exemplo.com.br", "pass" : "123456",
            "active" : true, "std" : "user", "fullname" : "João Silveira"
         },
         {
            "name" : "Maria", "email" : "maria@exemplo.com.br", "pass" : "123456",
            "active" : true, "std" : "user", "fullname" : "Maria Silveira"
         }
      ]};

   beforeEach(module('exApp', 'user'));
   beforeEach(inject(function(_$componentController_, _$rootScope_, _$location_, _$q_) { 
      
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      $location = _$location_;
      $q = _$q_;

      var ds = {
         httpGet: function() {
            return $q.when(listMock);
         }
      };

      controller = $componentController('user', {$rootScope, $location, dataService: ds});
   }));


   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

   it('original list should equal []', function() {
      expect(controller.list).toEqual([]);
   });

   it('delete button should redirect to "user/0"', function() {
      controller.ins();
      expect($location.$$path).toBe('/user/0');
   });

   describe('When loaded', function() {

      beforeEach(function() {
         $rootScope.$apply();
      });
    
      it('list should have 3 userd', function() {
         expect(controller.list.length).toBe(listMock.data.length);
      });

   });

});