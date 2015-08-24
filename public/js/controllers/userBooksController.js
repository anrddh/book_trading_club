readNook.controller("userBooksController", function($scope, $http, auth, $location) {
    $scope.showSuccessAlert = false;
    $scope.isLoggedIn       = auth.isLoggedIn;
    $scope.currentUser      = auth.currentUser();
    $scope.logOut           = auth.logOut;
    $scope.books            = [];

    if(!auth.isLoggedIn()) {
        $location.path('/');
    }

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