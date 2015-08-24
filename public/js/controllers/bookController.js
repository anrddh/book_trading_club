readNook.controller("bookController", function($scope, $http, auth, $location) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.logOut = auth.logOut;

    $http.get('/api/users', {headers:{Authorization: 'Bearer '+auth.getToken()}})
        .success(function(users) {
            $scope.books = users.map(function(user) {
                var books = user.books.map(function(book) {
                    book.username = user.username;
                    return book;
                });
                return books;
            });

            $scope.books = $scope.books.reduce(function(prev_book, next_book) {
                return prev_book.concat(next_book);
            }, []);

            console.log($scope.books);
        })
        .error(function(err) {
            console.log("Error: " + err);
        });
});