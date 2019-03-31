/*eslint-disable no-undef*/
/*eslint-disable no-console*/
/*eslint-disable no-unused-vars*/

angular.module('app', ['ngResource'])
    .controller('IncomeNameController', function ($http, $resource) {
        var vm = this;

        var IncomeBasicNames = $resource('api/incomeBasicNames/:basicNamesId');
        var IncomeDetails = $resource('api/incomeDetails/:detailsId');
        var User = $resource('api/user/:userId');

        vm.incomeBasicName = new IncomeBasicNames();
        vm.incomeDetails = new IncomeDetails();
        vm.userGet = new User();

        vm.getUserById = User.get({userId: 1});
        function refreshData () {
            vm.incomeNamesGet = IncomeBasicNames.query();
            vm.incomeDetailsGet = IncomeDetails.query();
        }

        vm.addIncomeDetails = function(incomeDetails) {
            console.log(vm.incomeDetails.__proto__);
            vm.incomeDetails.user = vm.getUserById;
            vm.incomeDetails.$save(function (data) {
                refreshData();
                vm.incomeDetails = new IncomeDetails();
            });
        };

        vm.addIncomeBasicNames = function (incomeBasicNames) {
            console.log(vm.incomeDetails.__proto__);
            vm.incomeBasicName.user = vm.getUserById;
            vm.incomeBasicName.$save(function (data) {
                refreshData();
                vm.incomeBasicName = new IncomeBasicNames();
            });
        };

        refreshData();
    });