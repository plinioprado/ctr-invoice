describe('Controller recinsDetail:', function() {

   var $componentController, $routeParams, $rootScope, $scope, $location, $filter, baseService, dataService;
   var controller;
   var dataMock = {
      status: 200,
      data: {
         cod: 'NF1',
         dt: new Date('2016-01-02'),
         val: 1000,
         cp: {
            cod: '11111111000111',
            name: 'Fulano',
            address: {
               addr: 'Rua Ipiranga, 111', 
               neigh: 'Centro',
               city: 'Sao Paulo',
               state: 'SP',
               zip: '11111222'
            }
         },
         std: 'nfs',
         txt: 'Teste',
         recList: [
            {
               val: 1000,
               dtdue: new Date('2016-02-2')
            }
         ]
      }
   };

   beforeEach(module('exApp', 'recinsDetail'));
   beforeEach(inject(function(_$componentController_, _$routeParams_, _$rootScope_, _$location_, _$filter_, _baseService_, _$q_) {
      
      $componentController = _$componentController_;
      $routeParams = _$routeParams_;
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      $location = _$location_;
      $filter = _$filter_;
      baseService = _baseService_;
      $q = _$q_;

      var ds = {
         httpGet: function(url) {
            return $q.when(dataMock);
         }
      };

      controller = $componentController('recinsDetail', {$routeParams, $rootScope, $scope, $location, $filter, baseService, 'dataService': ds});
   }));

   it('controller should exist', function() {
      expect(controller).toBeDefined();
   });

   it('data should be a empty object', function() {
      expect(controller.data).toEqual({});
   });

   describe('when loaded', function() {

      beforeEach(function() {
         $rootScope.$apply();
      });

      it('data should be the mock', function() {
         expect(controller.data).toEqual(dataMock.data);
      });   

      it('should have 1 rec', function() {
         expect(controller.data.recList.length).toBe(1);
      });

      it('"Adicionar" should set to 2 recs', function() {
         controller.itemAdd();
         expect(controller.data.recList.length).toEqual(2);
      });

      it('"Remover ult." should reset to 1 rec', function() {
         controller.itemDel();
         expect(controller.data.recList.length).toEqual(1);
      });

   });

});