var User     = require('./models/user.js').user;
var passport = require('passport');
var jwt      = require('express-jwt');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function(app) {
    app.get('/api/user/books/:user_name', auth, function(req, res) {
        User.find({username: req.params.user_name}, "books", function(err, books) {
            if(err) res.send(err);
            res.json(books);
        });
    });

    app.get('/api/users', auth, function(req, res) {
        User.find({}, "username books", function(err, users) {
            res.json(users);
        });
    });

    app.post('/api/user/books/add', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            var books = {
                name: req.body.name,
                author: req.body.author
            }

            user[0].books.push(books);

            user[0].save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully added book!"});
        });
    });

    app.post('/api/user/books/delete', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            var index = user[0].books.indexOf(req.body.book);

            user[0].books.splice(index, 1);

            user[0].save(function(err) {
                if(err) res.send(err);
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