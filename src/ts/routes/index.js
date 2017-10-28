/// <reference path="../../_all.d.ts" />
'use strict';
var express = require('express');
var passport = require('passport');
var account = require('../models/account');
var router = express.Router();
router.get('/', function (req, res) {
    res.render('pages/index', { user: req.user });
});
router.get('/register', function (req, res) {
    res.render('auth/register', {});
});
router.post('/register', function (req, res, next) {
    account.register(new account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.render('auth/register', { error: err.message });
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});
router.get('/login', function (req, res) {
    res.render('auth/login', { user: req.user, error: req.flash('error') });
});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function (req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
router.get('/logout', function (req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
router.get('/ping', function (req, res) {
    res.status(200).send('pong!');
});
module.exports = router;
