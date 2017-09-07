angular.module('quflipMobWeb', [
    'quflipMobWeb.services',
    'quflipMobWeb.controllers',
    'quflipMobWeb.login',
    'quflipMobWeb.homeController',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/home", { templateUrl: "template/home.html", controller: "homeController" }).
    when("/login", { templateUrl: "template/login.html", controller: "loginController" }).
    otherwise({ redirectTo: '/login' });
}]);