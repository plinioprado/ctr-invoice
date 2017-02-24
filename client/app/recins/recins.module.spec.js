describe('Controller recins: ', function() {

   var $componentController, $rootScope, $location, $filter, baseService;
   var controller;
   var listMock = {
      status: 200,
      data: [
      { cod: 'NF1', dt: new Date('2016-01-02'), val: 1000, cp: { name: 'Fulano' } },
      { cod: 'NF2', dt: new Date('2016-01-03'), val: 1500, cp: { name: 'Beltrano'} },
      { cod: 'NF3', dt: new Date('2016-01-05'), val: 800, cp: { name: 'Fulano'} },
      ]
   };

   beforeEach(module('exApp', 'recins'));
   beforeEach(inject(function(_$componentController_, _$rootScope_, _$location_, _$filter_, _$q_) {
      
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      $location = _$location_;
      $filter = _$filter_;
      $q = _$q_;

      var ds = {
         httpGet: function() {
            return $q.when(listMock);
         }
      };
      
      controller = $componentController('recins', {$rootScope, $location, $filter, dataService: ds});
   }));

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

   it('original list should equal []', function() {
      expect(controller.list).toEqual([]);
   });

   it('delete button should redirect to "recins/0"', function() {
      controller.ins();
      expect($location.$$path).toBe('/recins/0');
   });

   describe('When loaded', function() {

      beforeEach(function() {
         $rootScope.$apply();
      });
    
      it('list should have 3 docs', function() {
         expect(controller.list.length).toBe(listMock.data.length);
      });

      it('total should match', function() {

         var tot = 0;
         for(i=0; i<controller.list.length; i++) {
            tot += controller.list[i].val;
         }
         expect(tot).toBe(controller.totVal());
      });

   });

});