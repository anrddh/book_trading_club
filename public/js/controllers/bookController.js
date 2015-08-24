readNook.controller("bookController", function($scope, $http, auth, $location) {
    $scope.homeClass = "";
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.logOut = auth.logOut;

    if(!auth.isLoggedIn()) {
        $location.path('/');
    }

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

    $scope.trade = function(book) {

    }

    $http.get('/api/books', {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(books) {
            $scope.books = books.map(function(book) {
                if(book.username === auth.currentUser()) {
                    book.trade = false;
                } else {
                    book.trade = true;
                }
                return book;
            });
        })
        .error(function(err) {
            console.log("Error: " + err);
        });
});