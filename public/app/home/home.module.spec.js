describe('Controller home:', function() {

   var $componentController, $rootScope;
   var controller;

   beforeEach(module('home'));
   beforeEach(inject(function(_$componentController_,_$rootScope_) {
      
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      controller = $componentController('home', {$rootScope: $rootScope});
   }));

   it('li1[pt] should be Bilingue', function() {
      expect(controller.txt['pt-br'].li1).toBe('Bilingue (pt,en)');
   });

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

});