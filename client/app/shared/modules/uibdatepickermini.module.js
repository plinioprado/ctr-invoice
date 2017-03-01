(function() {
   'use strict';

   angular
      .module('uibdatepickermini', [])
      .component('uibdatepickermini', {
         templateUrl: 'app/shared/modules/uibdatepickermini.template.html',
         controller: UibDatepickerControllerMini,
         controllerAs: 'vm',
         bindings: {
            dt: '=',
            format: '<',
            disabled: '='
         }
      });

   UibDatepickerControllerMini.$inject = ['$scope', '$filter'];

   function UibDatepickerControllerMini($scope, $filter) {

      var vm = this;

      vm.isValid = isValid;

      function isValid() {
         return ($filter('date')(vm.dt, 'yyyy-MM-dd') != undefined);
      }

      $scope.today = function() {
         vm.dt = new Date();
      };

      $scope.clear = function() {
         vm.dt = null;
      };

      $scope.inlineOptions = {
         customClass: getDayClass,
         minDate: new Date(),
         showWeeks: true
      };

      $scope.dateOptions = {
         formatYear: 'yyyy',
         maxDate: new Date(2020, 12, 31),
         minDate: new Date(2000, 1, 1),
         startingDay: 1
      };

      $scope.toggleMin = function() {
         $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
         $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
      };
      $scope.toggleMin();

      $scope.open = function() {
         $scope.popup.opened = true;
      };

      $scope.setDate = function(year, month, day) {
         vm.dt = new Date(year, month, day);
      };

      //$scope.format = 'dd/MM/yyyy';

      $scope.popup = {
         opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
         {
            date: tomorrow,
            status: 'full'
         },
         {
            date: afterTomorrow,
            status: 'partially'
         }
      ];

     function getDayClass(data) {
         var date = data.date,
            mode = data.mode;
         if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
               var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

               if (dayToCheck === currentDay) {
                  return $scope.events[i].status;
               }
            }
         }
         return '';
     }
   }

})();