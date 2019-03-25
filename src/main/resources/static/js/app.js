/*eslint-disable no-undef*/
/*eslint-disable no-console*/
/*eslint-disable no-unused-vars*/

angular.module('app', ['ngResource'])
    .controller('IncomeNameController', function ($http, $resource) {
        var vm = this;
        var IncomeNames = $resource('api/incomeBasicNames');
        var IncomeDetails = $resource('api/incomeDetails');
        var IncomeBudget = $resource('api/incomeBudget/:incomeBudgetId');
        var User = $resource('api/user/:userId');

        vm.incomeName = new IncomeNames();
        vm.incomeBudget = new IncomeBudget();
        vm.user = new User();

        vm.getUserById = User.get({userId: 1});
        function refreshData () {
            vm.incomeNamesGet = IncomeNames.query();
            vm.incomeDetailsGet = IncomeDetails.query();
            vm.incomeBudgetsGet = IncomeBudget.query();
        }

        vm.addIncomeBudget = function(incomeBudget) {
            console.log(vm.incomeBudget.__proto__);
            vm.incomeBudget.user = vm.getUserById;
            vm.incomeBudget.$save(function(data){
                refreshData();
                vm.incomeBudget = new IncomeBudget();
            });
        };

        refreshData();
    });