/*eslint-disable no-undef*/
/*eslint-disable no-console*/
/*eslint-disable no-unused-vars*/

angular.module('app', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'partials/index/list.html',
                controller: 'BudgetListController',
                controllerAs: 'budgetCtrl'
            })
            .when('/details/:id', {
                templateUrl: 'partials/index/details.html',
                controller: 'BudgetDetailsController',
                controllerAs: 'budgetDetailsCtrl'
            })
            .when('/new', {
                templateUrl: 'partials/index/new.html',
                controller: 'BudgetAddNewController',
                controllerAs: 'newBudgetCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/index/login.html',
                controller: 'AuthenticationController',
                controllerAs: 'authController'
            })
            .otherwise({redirectTo: '/list'
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    })
    .constant('BUDGET_ENDPOINT', '/api/budget/:id')
    .constant('LOGIN_ENDPOINT', '/login')
    .constant('LOGOUT_ENDPOINT', '/logout')
    .constant('USER_AUTH', 'api/user/userAuth')
    .factory('Budget', function ($resource, BUDGET_ENDPOINT) {
        return $resource(BUDGET_ENDPOINT);
    })
    .factory('User', function ($resource) {
        return $resource('api/user/:username');
    })
    .factory('Auth', function ($resource, USER_AUTH) {
        return $resource(USER_AUTH);
    })
    .service("UserAuthService", function (Auth, $rootScope) {
        this.userAuth = function () {
            Auth.get().$promise.then(function (user) {
                $rootScope.username = user.name;
                console.log('Service username: '+$rootScope.username);
                $rootScope.authenticated = user.authenticated;
                console.log('Service auth: '+$rootScope.authenticated);
            });
        };
    })
    .service("BudgetsService", function ($rootScope, Budget) {
        this.getAll = function () {
            console.log('Test list budget with username: '+$rootScope.username);
            return Budget.query();
        };
        this.get = function (index) {
            return Budget.get({id: index});
        };
        this.add = function (budget) {
            return budget.$save();
        }
    })
    .service('AuthenticationService', function ($http, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, $rootScope, $location, UserAuthService) {
        this.authenticate = function (credentials, successCallback) {
            var authHeader = {Authorization: 'Basic ' + btoa(credentials.username+':'+credentials.password)};
            var config = {headers: authHeader};
            var authSuccess = function () {
                $location.path('/');
                $rootScope.loginErrorMessage = false;
                UserAuthService.userAuth();
            };
            var authNotSuccess = function () {
                $rootScope.authenticated = false;
                $rootScope.loginErrorMessage = true;
            };
            $http
                .post(LOGIN_ENDPOINT, {}, config)
                .then(function success (value) {
                    //$http.defaults.headers.post.Authorization = authHeader.Authorization;
                    console.log('Login success');
                    authSuccess();
                }, function error (reason) {
                    authNotSuccess();
                    console.log('Login error');
                    console.log(reason);
                });
        };
        this.logout = function (logoutSuccess) {
            $http.post(LOGOUT_ENDPOINT, {});
            logoutSuccess();
        }
    })
    .controller('AuthenticationController', function (UserAuthService, $rootScope, $location, AuthenticationService) {
        $rootScope.loginErrorMessage = false;
        var vm = this;
        vm.credentials = {};
        vm.login = function () {
            AuthenticationService.authenticate(vm.credentials)
        };
        var logoutSuccess = function () {
            $location.path('/');
            UserAuthService.userAuth();
        };
        vm.logout = function () {
            AuthenticationService.logout(logoutSuccess)
        }
    })
    .controller('BudgetListController', function (BudgetsService, $resource, UserAuthService, Auth) {
        //UserAuthService.userAuth();
        var vm = this;
        vm.allBudgets = BudgetsService.getAll();
    })
    .controller('BudgetDetailsController', function ($rootScope, $routeParams, BudgetsService, UserAuthService) {
        //UserAuthService.userAuth();
        console.log(' TestDetails: '+$rootScope.username);
        var vm = this;
        var budgetIndex = $routeParams.id;
        vm.oneBudget = BudgetsService.get(budgetIndex);
    })
    .controller('BudgetAddNewController', function (BudgetsService, Budget, User, $rootScope) {
        var vm = this;
        vm.user = $rootScope.username;
        console.log('Actual username: ' + vm.user + ' Test: '+$rootScope.username);
        vm.getUserByUsername = User.get({username: vm.user});
        vm.budget = new Budget();
        vm.saveBudget = function () {
            vm.budget.user = vm.getUserByUsername;
            BudgetsService.add(vm.budget);
            vm.budget = new Budget();
        };
    })
    .controller('IndexController', function (UserAuthService) {
        UserAuthService.userAuth();
    });
