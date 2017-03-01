(function() {
   'use strict';

   angular
      .module('recinsDetail', [])
      .component('recinsDetail', {
         templateUrl: 'app/recins/recins-detail.template.html',
         controller: RecInsDetailController,
         controllerAs: 'vm'
      });

   RecInsDetailController.$inject = ['$routeParams', '$rootScope', '$scope', '$location', '$filter', 'baseService', 'dataService'];

   function RecInsDetailController($routeParams, $rootScope, $scope, $location, $filter, baseService, dataService) {

      var vm = this;
      
      // Variables

      vm.apiUrl = '/api/recins';

      vm.config = {};
      vm.data = {};
      vm.dateFormat;
      vm.itemEditSeq = 0;
      vm.msg = '';
      vm.new;
      vm.ro;

      vm.showOk = $routeParams.cod == 0 ? true : false;
      vm.showRecEdit = false;
      
      vm.strDt = '';
      vm.strDtOld = '';
      vm.strVal = '';
      vm.strValOld = '';

      vm.submitted = false;
      vm.tables = {};

      // Texts

      vm.lang = $rootScope.lang;
      vm.txt = {
         'en-us': {
            add: 'add',
            addressAddr: 'Address',
            addressCity: 'City/State',
            addressNeigh: 'Neighborhood',
            addressZip: 'Zip',
            back: 'Back',
            date: 'Date',
            delete: 'Delete',
            dtDue: 'Dt.due',
            edit: 'Edit',
            empty: 'Empty',
            invalid: 'Invalid',
            invoice: 'Invoice or revenue',
            less3: '< 3 characters',
            less8: '< 8 characters',
            name: 'Customer',
            rec: 'Rec',
            std: 'Std',
            subLast: 'Remove last',
            text: 'Text',
            value: 'Value',
         },
         'pt-br': {
            add: 'Adicionar',
            addressAddr: 'Endereço',
            addressCity: 'Municipio/Uf',
            addressNeigh: 'Bairro',
            addressZip: 'Cep',
            back: 'Retornar',
            date: 'Data',
            delete: 'Excluir',
            dtDue: 'Dt.venc',
            edit: 'Editar',
            empty: 'Em branco',
            invalid: 'Inválido',
            invoice: 'Fatura ou receita',
            less3: '< 3 caracteres',
            less8: '< 8 caracteres',
            name: 'Cliente',
            rec: 'Título',
            std: 'Tipo',
            text: 'Texto',
            subLast: 'Remover ult.',
            value: 'Valor'
         }
      }
   
      // Functions

      vm.back = back;
      vm.calc = calc;

      vm.dataDelete = dataDelete;
      vm.dataFailed = dataFailed;
      vm.dataGet = dataGet;
      vm.dataGetComplete = dataGetComplete;
      vm.dataSubmit = dataSubmit;
      vm.dataSubmitComplete = dataSubmitComplete;

      vm.edit = edit;

      vm.itemAdd = itemAdd;
      vm.itemEdit = itemEdit;
      vm.itemDel = itemDel;

      vm.ok = ok;
      
      vm.onDtChange = onDtChange;
      vm.onDtFocus = onDtFocus;
      vm.onItemDtChange = onItemDtChange;
      vm.onItemDtFocus = onItemDtFocus;
      vm.onItemValBlur = onItemValBlur;
      vm.onItemValChange = onItemValChange;
      vm.onItemValFocus = onItemValFocus;
      vm.onValBlur = onValBlur;
      vm.onValChange = onValChange;
      vm.onValFocus = onValFocus;

      vm.totRec = totRec;

      activate();

      function activate() {
         try {
            vm.config = baseService.configGet();
            vm.tables = baseService.tablesGet();  
            vm.dateFormat = $rootScope.lang == 'en-us' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';          
         } catch(err) {
            vm.msg = err;
         }
         vm.dataGet();
         vm.new = $routeParams.cod == '0' ? true : false;
         vm.ro = !vm.new;
      }

      function calc() {

         vm.data.dt = new Date(vm.data.dt);
         vm.strVal = $filter('number')(vm.data.val, 2);

         for (var key in vm.data.recList) {
            vm.data.recList[key].seq = Number(key)+1;
            vm.data.recList[key].dtDue = new Date(vm.data.recList[key].dtDue);
            //vm.data.recList[key].dtDueStr = $filter('date')(vm.data.recList[key].dtDue, vm.dateFormat, 'UTC');
            vm.data.recList[key].valStr = $filter('number')(vm.data.recList[key].val, 2);
         }
      }

      function back() {

         $location.path('/recins');
      }

      function edit() {

        vm.ro = false;
        vm.showOk = true;
      }

      function dataDelete() {

         if (vm.new) return;

         dataService.httpDelete(vm.apiUrl + '/' + vm.data.cod)
            .then(vm.dataGetComplete)
            .catch(vm.dataGetFailed);
      }

      function dataFailed(error) {
            console.log('c-nok(ri)');
            console.log(error);
            vm.msg = (error.data == 'error' || !angular.isString(error.data)) ? 'Erro' : 'Erro (' + error.data + ')';
            return false;
      }

      function dataGet() {

         return dataService.httpGet(vm.apiUrl + '/' + $routeParams.cod, {})
            .then(vm.dataGetComplete)           
            .catch(vm.dataFailed);
      }

      function dataGetComplete(response) {

         if (response.status == 200) {
            vm.data = response.data;
            vm.calc();
         } else {
            vm.dataFailed();
         }
      }

      function dataSubmit() {

         var data = {};
         angular.copy(vm.data, data);
         data.dt = $filter('date')(vm.data.dt, 'yyyy-MM-dd', 'UTC');
         data.recList = [];
         var len = vm.data.recList.length;
         for (var i = 0; i < len; i++) {
            data.recList.push({
               dtDue: $filter('date')(vm.data.recList[i].dtDue, 'yyyy-MM-dd', 'UTC'),
               val: vm.data.recList[i].val
            })
         }

         if (vm.new) {

            return dataService.httpPost(vm.apiUrl, data)
               .then(vm.dataSubmitComplete)
               .catch(vm.dataFailed);

         } else {

            var url = vm.apiUrl + '/' + data.cod;
            delete data.cod;

            return dataService.httpPut(url, data)
               .then(vm.dataSubmitComplete)
               .catch(vm.dataFailed);
         }
      }

      function dataSubmitComplete(response) {

         if (response.status == 200) {
            $location.path('/recins');
            return true;
         } else {
            vm.httpFailed(response);
            return false;
         }
      }

      function itemAdd() {
         vm.data.recList.push({
            dtDue: new Date(),
            val: vm.data.val - vm.totRec()
         });
         vm.calc();
      }

      function itemEdit(seq) {
         if (vm.ro) return false;
         vm.recEditSeq = seq;
      }

      function itemDel() {
        vm.data.recList.pop();
        vm.calc();
      }

      function ok() {

         vm.msg = '';
         vm.submitted = true;

         if($scope.form.$invalid || !vm.data.val) return;

         vm.dataSubmit();
      }

      function onDtFocus() {
         vm.strDtOld = vm.strDt;
      }

      function onDtChange() {
         if (!vm.strDt) {
            vm.data.dt = undefined;
            vm.strDtOld = vm.strDt;
         } else if (!testDtStr(vm.strDt)) {
            vm.strDt = vm.strDtOld;
         } else {
            vm.strDtOld = vm.strDt;
            if ($rootScope.lang == 'pt-br') {
               item.dtDue = item.dtDueStr.substr(6,4)+'-'+item.dtDueStr.substr(3,2)+'-'+item.dtDueStr.substr(0,2); 
            } else {
               item.dtDue = item.dtDueStr.substr(3,2)+'-'+item.dtDueStr.substr(6,4)+'-'+item.dtDueStr.substr(0,2);                
            }
         }
      }

      function onItemDtFocus(item) {
         vm.strDtOld = item.dtDueStr;
      }

      function onItemDtChange(item) {
         if (!testDtStr(item.dtDueStr)) {
            item.dtDueStr = vm.strDtOld;
         } else {
            vm.strDtOld = item.dtDueStr;
            if ($rootScope.lang == 'pt-br') {
               item.dtDue = item.dtDueStr.substr(6,4)+'-'+item.dtDueStr.substr(3,2)+'-'+item.dtDueStr.substr(0,2); 
            } else {
               item.dtDue = item.dtDueStr.substr(3,2)+'-'+item.dtDueStr.substr(6,4)+'-'+item.dtDueStr.substr(0,2);                
            }
         }
      }

      function onItemValFocus(item) {
         item.valStr = item.valStr.replace('.','');
         vm.strValOld = item.valStr;
      }

      function onItemValChange(item) {
         try {
            item.val = Number(item.valStr.replace(',','.'));
            if (item.val === null) throw 'e';
            if (item.val*100 != Math.floor(item.val*100)) throw 'e';
            vm.strValOld = item.valStr;
         } catch(err) {
            item.valStr = vm.strValOld;
            item.val = Number(item.valStr.replace(',','.'));
         }
      }

      function onItemValBlur(item) {
         item.valStr = $filter('number')(item.val, 2);
      }

      function onValFocus() {

         vm.strVal = vm.strVal.replace('.', '');
         vm.strValOld = vm.strVal;
      }

      function onValChange(str) {
      
         try {
            vm.data.val = Number(str.replace(',','.'));
            if (vm.val === null) throw 'e';
            if (vm.data.val*100 != Math.floor(vm.data.val*100)) throw 'e';
            vm.strValOld = vm.valStr;
         } catch(err) {
            vm.valStr = vm.strValOld;
            vm.data.val = Number(vm.valStr.replace(',','.'));
         }
      }

      function onValBlur() {
         vm.strVal = vm.strVal.replace('.','').replace(',','.');
         vm.strVal = $filter('number')(vm.strVal, 2)
      }

      function testDtStr(str) {
         if ($rootScope == 'pt-br') {
            if (!str) {
               return true;
            } else if (str.length == 0) {
               return true;
            } else if (str.length == 1) {
               if(!/[0-3]/.test(str)) return false;
               return true;
            } else if (str.length == 2) {
               if(!/[0-3][0-9]/.test(str)) return false;
               if (Number(str) > 31) return false;
               return true;
            } else if (str.length == 3) {
               if(!/[0-3][0-9]\//.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               return true;
            } else if (str.length == 4) {
               if(!/[0-3][0-9]\/[0-1]/.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               return true;
            } else if (str.length == 5) {
               if(!/[0-3][0-9]\/[0-1][0-9]/.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               if (Number(str.substr(3,2)) > 12) return false;
               return true;
            } else if (str.length == 6) {
               if(!/[0-3][0-9]\/[0-1][0-9]\//.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               if (Number(str.substr(3,2)) > 12) return false;
               return true;
            } else if (str.length == 7) {
               if(!/[0-3][0-9]\/[0-1][0-9]\/[1-2]/.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               if (Number(str.substr(3,2)) > 12) return false;
               return true;
            } else if (str.length == 8) {
               if(!/[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9]/.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               if (Number(str.substr(3,2)) > 12) return false;
               return true;
            } else if (str.length == 9) {
               if(!/[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9]/.test(str)) return false;
               if (Number(str.substr(0,2)) > 31) return false;
               if (Number(str.substr(3,2)) > 12) return false;
               return true;
            } else if (str.length == 10) {
               try {
                  if(!/[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9][0-9]/.test(str)) return false;
                  var dt = new Date(Number(str.substr(6,4)), Number(str.substr(3,2)) - 1, Number(str.substr(0,2)), 0, 0, 0, 0);
                  if ($filter('date')(dt, 'dd/MM/yyyy', 'UTC') != str) return false;
                  return true;
               } catch(err) {
                  return false;
               }
            } else {
               return false;
            }            
         } else {
            if (!str) {
               return true;
            } else if (str.length == 0) {
               return true;
            } else if (str.length > 0 && str.length < 10) {
               return true;
            } else if (str.length == 10) {
               try {
                  if(!/[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9][0-9]/.test(str)) return false;
                  var dt = new Date(Number(str.substr(6,4)), Number(str.substr(3,2)) - 1, Number(str.substr(0,2)), 0, 0, 0, 0);
                  if ($filter('date')(dt, 'MM/dd/yyyy', 'UTC') != str) return false;
                  return true;
               } catch(err) {
                  return false;
               }
            } else {
               return false;
            }  
         }
      }

      function totRec() {
         var tot = 0;
         for (var key in vm.data.recList) {
            tot += Number(vm.data.recList[key].val);
         }
         return tot;
      }

   }

})();

