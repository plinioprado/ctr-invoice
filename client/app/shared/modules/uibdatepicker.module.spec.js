describe('Controller uibdatepicker:', function() {

   var $componentController, $rootScope, $scope, $filter;
   var controller;

   beforeEach(module('exApp', 'uibdatepicker'));
   beforeEach(inject(function(_$componentController_, _$rootScope_, _$filter_) {
      
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      $filter = _$filter_;

      controller = $componentController('uibdatepicker', {$scope, $filter});
   }));

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

});