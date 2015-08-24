readNook.controller("mainController", function($scope, $http, auth, $location) {
    $scope.homeClass = "active";
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.logOut = auth.logOut;
});