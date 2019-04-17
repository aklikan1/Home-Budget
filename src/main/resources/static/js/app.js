/*eslint-disable no-undef*/
/*eslint-disable no-console*/
/*eslint-disable no-unused-vars*/

angular.module('app', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'BudgetListController',
                controllerAs: 'budgetCtrl'
            })
            .when('/details/:id', {
                templateUrl: 'partials/details.html',
                controller: 'BudgetDetailsController',
                controllerAs: 'budgetDetailsCtrl'
            })
            .when('/new', {
                templateUrl: 'partials/new.html',
                controller: 'BudgetAddNewController',
                controllerAs: 'newBudgetCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'AuthenticationController',
                controllerAs: 'authController'
            })
            .otherwise({
                redirectTo: '/list'
            });
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    })
    .constant('BUDGET_ENDPOINT', '/api/budget/:id')
    .constant('LOGIN_ENDPOINT', '/login')
    .constant('LOGOUT_ENDPOINT', '/logout')
    .factory('Budget', function ($resource, BUDGET_ENDPOINT) {
        return $resource(BUDGET_ENDPOINT);
    })
    .factory('User', function ($resource) {
        return $resource('api/user/:username');
    })
    .service("BudgetsService", function (Budget) {
        this.getAll = function () {
            return Budget.query();
        };
        this.get = function (index) {
            return Budget.get({id: index});
        };
        this.add = function (budget) {
            return budget.$save();
        }
    })
    .service('AuthenticationService', function ($http, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, $rootScope) {
        this.authenticate = function (credentials, successCallback) {
            console.log('first: '+credentials.username);
            var authHeader = {Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)};
            var config = {headers: authHeader};
            $http
                .post(LOGIN_ENDPOINT, {}, config)
                .then(function success (value) {
                    $http.defaults.headers.post.Authorization = authHeader.Authorization;
                    successCallback;
                    $rootScope.username = credentials.username;
                }, function error (reason) {
                    console.log('Login error');
                    console.log(reason);
                });
        };
        this.logout = function (successCallback) {
            delete $http.defaults.headers.post.Authorization;
            $rootScope.username = '';
            successCallback();
        }
    })
    .controller('AuthenticationController', function ($rootScope, $location, AuthenticationService) {
        var vm = this;
        vm.credentials = {};
        var loginSuccess = function () {
            $rootScope.authenticated = true;
            $location.path('/new')
        };
        vm.login = function () {
            AuthenticationService.authenticate(vm.credentials, loginSuccess())
        };
        var logoutSuccess = function () {
            $rootScope.authenticated = false;
            $location.path('/');
        };
        vm.logout = function () {
            AuthenticationService.logout(logoutSuccess)
        }
    })
    .controller('BudgetListController', function (BudgetsService, $rootScope) {
        var vm = this;
        vm.allBudgets = BudgetsService.getAll();
    })
    .controller('BudgetDetailsController', function ($routeParams, BudgetsService) {
        var vm = this;
        var budgetIndex = $routeParams.id;
        vm.oneBudget = BudgetsService.get(budgetIndex);
    })
    .controller('BudgetAddNewController', function (BudgetsService, Budget, User) {
        var vm = this;
        vm.getUserById = User.get({username: 'a'});
        vm.budget = new Budget();
        vm.saveBudget = function () {
            vm.budget.user = vm.getUserById;
            BudgetsService.add(vm.budget);
            vm.budget = new Budget();
        }
    });
