var User     = require('./models/user.js').user;
var Book     = require('./models/book.js').book;
var passport = require('passport');
var jwt      = require('express-jwt');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function(app) {
    app.get('/api/user/books/:user_name', auth, function(req, res) {
        Book.find({username: req.params.user_name}, function(err, books) {
            if(err) res.send(err);
            res.json(books);
        });
    });

    app.get('/api/books', auth, function(req, res) {
        Book.find({available: true}, function(err, books) {
            res.json(books);
        });
    });

    app.post('/api/user/books/add', auth, function(req, res) {
        var book = new Book();

        book.username  = req.body.username;
        book.name      = req.body.name;
        book.author    = req.body.author;
        book.available = true;

        book.save(function(err) {
            if(err) res.send(err);
        });

        res.json({message: "successfully added book!"});
    });

    app.post('/api/user/books/delete', auth, function(req, res) {
        Book.find({username: req.body.username, name: req.body.name}, function(err, book) {
            if(err) res.send(err);

            book[0].remove();

            res.json({message: "Successfully removed book!"});
        });
    });

    app.post('/api/books/trade/request', auth, function(req, res) {
        Book.find({username: req.body.username, name: req.body.name}, function(err, book) {
            if(err) res.send(err);

            book[0].available = false;

            User.find({username: req.body.username}, function(err, user) {
                user[0].lendRequests.push(req.body.name);

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            User.find({username: req.body.usernameR}, function(err, user) {
                user[0].borrowRequests.push(req.body.name);

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            res.json({message: "Successfully sent borrow request!"});
        });
    });

    app.post('/api/books/trade/request/accept', auth, function(req, res) {
        Book.find({username: req.body.username, name: req.body.name}, function(err, book) {
            if(err) res.send(err);

            User.find({username: req.body.username}, function(err, user) {
                user[0].lendRequests.splice(user[0].lendRequests.indexOf(req.body.name));
                user[0].lent.push(req.body.name);

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            User.find({username: req.body.usernameR}, function(err, user) {
                user[0].borrowRequests.splice(user[0].borrowRequests.indexOf(req.body.name));
                user[0].borrowed.push(req.body.name);

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });
        });
    });

    app.post('/api/books/trade/request/decline', auth, function(req, res) {
        Book.find({username: req.body.username, name: req.body.name}, function(err, book) {
            if(err) res.send(err);

            book[0].available = true;

            User.find({username: req.body.username}, function(err, user) {
                user[0].lendRequests.splice(user[0].lendRequests.indexOf(req.body.name));

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            User.find({username: req.body.usernameR}, function(err, user) {
                user[0].borrowRequests.splice(user[0].borrowRequests.indexOf(req.body.name));

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });
        });
    });


    app.post('/api/books/trade/cancel', auth, function(req, res) {
        Book.find({username: req.body.username, name: req.body.name}, function(err, book) {
            if(err) res.send(err);

            book[0].available = true;

            User.find({username: req.body.username}, function(err, user) {
                user[0].lent.splice(user[0].lent.indexOf(req.body.name));

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            User.find({username: req.body.usernameR}, function(err, user) {
                user[0].borrowed.splice(user[0].borrowed.indexOf(req.body.name));

                user[0].save(function(err) {
                    if(err) res.send(err);
                })
            });

            res.json({message: "Successfully removed book!"});
        });
    });

    app.get('/api/user/name', auth, function(req, res) {
        User.find({username: req.body.username}, "name", function(err, user) {
            if(err) res.send(err);

            res.json(user[0]);
        });
    });


    app.post('/api/user/name/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user[0].name = req.body.name;

            user[0].save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated preferences!"});
        });
    });

    app.get('/api/user/city', auth, function(req, res) {
        User.find({username: req.body.username}, "city", function(err, user) {
            if(err) res.send(err);

            res.json(user[0]);
        });
    });

    app.post('/api/user/city/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user[0].city = req.body.city;

            user[0].save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated preferences!"});
        });
    });

    app.get('/api/user/state', auth, function(req, res) {
        User.find({username: req.body.username}, "state", function(err, user) {
            if(err) res.send(err);

            res.json(user[0]);
        });
    });

    app.post('/api/user/state/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user[0].state = req.body.state;

            user[0].save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated preferences!"});
        });
    });

    app.post('/register', function(req, res, next) {
        var user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if(err) return next(err);

            return res.json({token: user.generateJWT()});
        });
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info){
            if(err){ return next(err); }

            if(user){
                return res.json({token: user.generateJWT()});
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}