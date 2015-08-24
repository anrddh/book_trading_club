readNook.controller("userController", function($scope, $http, auth, $location) {
    $scope.showSuccessAlert = false;
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.logOut = auth.logOut;

    $scope.updateInfo = function() {
        $http.post('/api/user/name/update', {name: $scope.name}, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.showSuccessAlert = true;
                $scope.message = data.message;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });

        $http.post('/api/user/city/update', {city: $scope.city}, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.showSuccessAlert = true;
                $scope.message = data.message;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });

        $http.post('/api/user/state/update', {state: $scope.state}, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.showSuccessAlert = true;
                $scope.message = data.message;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    }

    $http.get('/api/user/name', {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(user) {
            $scope.name = user.name;
        })
        .error(function(err) {
            console.log("Error: " + err);
        });

    $http.get('/api/user/city', {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(user) {
            $scope.city = user.city;
        })
        .error(function(err) {
            console.log("Error: " + err);
        });

    $http.get('/api/user/state', {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(user) {
            $scope.state = user.state;
        })
        .error(function(err) {
            console.log("Error: " + err);
        });
});