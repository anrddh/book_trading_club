readNook.controller("userBooksController", function($scope, $http, auth, $location) {
    $scope.showSuccessAlert = false;
    $scope.isLoggedIn       = auth.isLoggedIn;
    $scope.currentUser      = auth.currentUser();
    $scope.logOut           = auth.logOut;
    $scope.books            = [];
    $scope.user             = {};

    $http.get('/api/user/'+auth.currentUser(), {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(user) {
            $scope.user.borrowRequests = user.borrowRequests;
            $scope.user.borrowed = user.borrowed;
            $scope.user.lendRequests = user.lendRequests;
            $scope.user.lent = user.lent;
        })
        .error(function(err) {
            console.log("Error: " + err);
        });

    if(!auth.isLoggedIn()) {
        $location.path('/');
    }

    $scope.showYourRequests = function() {
        if($scope.myRequests == false) {
            $scope.myRequests = true;
        } else {
            $scope.myRequests = false;
        }
    };

    $scope.showRequestsForYou = function() {
        if($scope.requestsForMe == false) {
            $scope.requestsForMe = true;
        } else {
            $scope.requestsForMe = false;
        }
    };

    $scope.showYourBorrowed = function() {
        if($scope.myBorrowed == false) {
            $scope.myBorrowed = true;
        } else {
            $scope.myBorrowed = false;
        }
    };

    $scope.showYourLent = function() {
        if($scope.myLent == false) {
            $scope.myLent = true;
        } else {
            $scope.myLent = false;
        }
    };

    $scope.acceptRequest = function(book) {
        var request = {
            username: auth.currentUser(),
            name: book
        };

        $http.post('/api/books/trade/request/accept', request, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };

    $scope.declineRequest = function(book) {
        var request = {
            username: auth.currentUser(),
            name: book
        };

        $http.post('/api/books/trade/request/decline', request, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };

    $scope.cancelRequest = function(book) {
        var request = {
            username: auth.currentUser(),
            name: book
        };

        $http.post('/api/books/trade/request/cancel', request, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };

    $scope.endRequest = function(book) {
        var request = {
            username: auth.currentUser(),
            name: book
        };

        $http.post('/api/books/trade/request/end', request, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                console.log(data);
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };


    $scope.addBook = function() {
        var book = {
            username: auth.currentUser(),
            name: $scope.bookName,
            author: $scope.bookAuthor
        };

        $scope.bookName = "";
        $scope.bookAuthor = "";

        $scope.books.push(book);

        $http.post('/api/user/books/add', book, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.showSuccessAlert = true;
                $scope.message = data.message;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };

    $scope.removeBook = function(book) {
        $scope.books.splice($scope.books.indexOf(book), 1);

        $http.post('/api/user/books/delete', book, {headers:{Authorization: 'Bearer '+auth.getToken()}})
            .success(function(data) {
                $scope.showSuccessAlert = true;
                $scope.message = data.message;
            })
            .error(function(err) {
                console.log("Error: " + err);
            });
    };

    $http.get('/api/user/books/'+auth.currentUser(), {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(books) {
            $scope.books = books;
        })
        .error(function(err) {
            console.log("Error: " + err);
        });
});