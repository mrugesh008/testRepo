angular.module('quflipMobWeb.controllers', [])
    .controller('driversController', function($scope, ergastAPIservice) {
        $scope.nameFilter = null;
        $scope.driversList = [];
        $scope.searchFilter = function(sriver) {
            var re = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
        };

        ergastAPIservice.getDrivers().success(function(response) {
            //Digging into the response to get the relevant data
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });
    });