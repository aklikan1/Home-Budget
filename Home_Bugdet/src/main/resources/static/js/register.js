angular.module('register', ['ngRoute', 'ngResource'])
    .constant('USER_ENDPOINT_REGISTER', '/api/user/register')
    .factory('Register', function ($resource, USER_ENDPOINT_REGISTER) {
        return $resource(USER_ENDPOINT_REGISTER);
    })
    .service('registerService', function () {
        this.addUser = function (newUser) {
            return newUser.$save();
        }
    })
    .controller('UserRegisterController', function ($http, $resource, Register, registerService, $window) {
        var vm = this;
        vm.newUser = new Register();
        vm.saveNewUser = function () {
            registerService.addUser(vm.newUser);
            vm.newUser = new Register();
            $window.location.href = '/';
        }
    });