angular.module('quflipMobWeb.login', []).
controller('loginController', function($scope, $location) {
    $scope.facebookClick = function() {
        $location.path("/home");
    };

    $scope.googleClick = function() {
        $location.path("/home");
    };
});