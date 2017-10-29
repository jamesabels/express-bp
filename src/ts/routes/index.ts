'use strict';
import * as express from 'express';
import * as passport from 'passport';
import { accountModel } from '../models/account';

export default class IndexRoute {
    app;
    constructor (app: any) {
        this.app = app;
    }

    _initLoginRoutes(router: express.Router) {
        // Get user login view
        router.get('/login', (req: any, res: any) => {
            res.render('auth/login', {user: req.user, error: req.flash('error')});
        });

        // Post a user login
        router.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }), (req: any, res: any, next: any) => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });


    }

    _initLogoutRoutes (router: express.Router) {
        // log a user out
        router.get('/logout', (req: any, res: any, next: any) => {
            req.logout();
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    }

    _initRegisterRoutes (router: express.Router) {
        // Get registration view
        router.get('/register', (req: any, res: any) => {
            res.render('auth/register', {});
        });

        // Post a user registration
        router.post('/register', (req: any, res: any, next: any) => {
            accountModel.register(new accountModel({username: req.body.username}), req.body.password, (err, account) => {
                if (err) {
                    return res.render('auth/register', {error: err.message});
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
    }

    _initMiscRoutes (router: express.Router) {
        // Get index view
        router.get('/', (req: any, res: any) => {
            res.render('pages/index', {user: req.user});
        });

        // Server test route
        router.get('/ping', (req: any, res: any) => {
            res.status(200).send('pong!');
        });
    }

    init () {
        let router = express.Router();

        this._initMiscRoutes(router);
        this._initLoginRoutes(router);
        this._initRegisterRoutes(router);
        this._initLogoutRoutes(router);

        return router;
    }
}