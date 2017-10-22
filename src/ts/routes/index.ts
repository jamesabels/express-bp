/// <reference path="../../_all.d.ts" />
'use strict';

var express = require('express');
var passport = require('passport');
var account = require('../models/account');
var router = express.Router();


router.get('/', (req: any, res: any) => {
    res.render('index', { user: req.user });
});

router.get('/register', (req: any, res: any) => {
    res.render('register', {});
});

router.post('/register', (req: any, res: any, next) => {
    account.register(new account({ username: req.body.username }), req.body.password, (err, account) => {
        if (err) {
            return res.render('register', { error: err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});


router.get('/login', (req: any, res: any) => {
    res.render('login', { user: req.user, error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req: any, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req: any, res: any, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req: any, res: any) => {
    res.status(200).send('pong!');
});

module.exports = router;
