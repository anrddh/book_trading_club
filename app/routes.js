var User     = require('./models/user.js').user;
var passport = require('passport');
var jwt      = require('express-jwt');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function(app) {
    app.get('/api/user/books/:user_name', auth, function(req, res) {
        User.find({username: req.params.user_name}, function(err, user) {
            if(err) res.send(err);
            res.json(user.books);
        });
    });

    app.post('/api/user/books/add', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user.bookNames.push(req.body.name);
            user.bookAuthors.push(req.body.author);

            user.save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully added book!"});
        });
    });

    app.post('/api/user/name/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user.name = req.body.name;

            user.save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated name!"});
        });
    });

    app.post('/api/user/city/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user.city = req.body.city;

            user.save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated city!"});
        });
    });

    app.post('/api/user/state/update', auth, function(req, res) {
        User.find({username: req.body.username}, function(err, user) {
            if(err) res.send(err);

            user.state = req.body.state;

            user.save(function(err) {
                if(err) res.send(err);
            });

            res.json({message: "Successfully updated state!"});
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