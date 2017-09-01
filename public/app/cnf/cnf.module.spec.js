describe('controller cnf:', function() {

   var $componentController, $rootScope, $location, baseService;
   var controller, bs;
   var cnfMock = {
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
   };

   beforeEach(module('exApp', 'cnf'));
   beforeEach(inject(function(_$componentController_, _$rootScope_, _$location_) {
      
      $componentController = _$componentController_;
      $rootScope = _$rootScope_;
      $location = _$location_;

      bs = {
         configGet: function() {
            return cnfMock;
         },
         configSet: function(data) {
            return 'ok';
         }
      }

      controller = $componentController('cnf', {$rootScope, $location, 'baseService': bs});
   }));

   it('controller exists', function() {
      expect(controller).toBeDefined();
   })

   it('data should be the mock', function() {
      expect(controller.data).toEqual(cnfMock);
   });

   it('"Ok" should call baseService.configSet()', function() {

      spyOn(bs, 'configSet');
      controller.submit({});
      expect(bs.configSet).toHaveBeenCalled();
   });   



});