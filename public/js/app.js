var readNook = angular.module('readNook', ['ngRoute', 'angular-loading-bar']);

readNook.factory('auth', ['$http', '$window', '$location', function($http, $window, $location) {
    var auth = {};

    auth.saveToken = function(token) {
        $window.localStorage['tok'] = token;
    };

    auth.getToken = function() {
        return $window.localStorage['tok'];
    };

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function(){
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user) {
        return $http.post('/register', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function(user) {
        return $http.post('/login', user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function() {
        $window.localStorage.removeItem('tok');
        document.location.reload(true);
        $location.path('/');
    };

    return auth;
}]);

readNook.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html',
            controller: 'mainController'
        })

        .when('/user', {
            templateUrl: '../views/user.html',
            controller: 'userController'
        })

        .when('/books', {
            templateUrl: '../views/books.html',
            controller: 'bookController'
        })

        .when('/user/books', {
            templateUrl: '../views/userBooks.html',
            controller: 'userBooksController'
        })

        .when('/login', {
            templateUrl: '../views/login.html',
            controller: 'authController'
        })

        .when('/register', {
            templateUrl: '../views/register.html',
            controller: 'authController'
        });
});