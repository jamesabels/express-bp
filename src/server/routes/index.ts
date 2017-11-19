'use strict';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import { accountModel } from '../models/account';

export default class IndexRoute {
    app;
    constructor (app: any) {
        this.app = app;
    }

    private _initLoginRoutes(router: express.Router) {
        // Get user login view
        router.get('/login', (req: any, res: any) => {
            res.render('pages/universal/auth/login', {user: req.user, error: req.flash('error')});
        });

        /**
        * @api {post} /login Login to the server
        * @apiName LoginUser
        * @apiGroup Auth
        *
        * @apiParam {String} username The user's username.
        * @apiParam {String} password The user's password.
        *
        */
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

    private _initLogoutRoutes (router: express.Router) {
        /**
        * @api {get} /logout Logout of the server.
        * @apiName LogoutUser
        * @apiGroup Auth
        */
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

    private _initRegisterRoutes (router: express.Router) {
        // Get registration view
        router.get('/register', (req: any, res: any) => {
            res.render('pages/universal/auth/register', {});
        });

        /**
        * @api {post} /register Register a new account with the server.
        * @apiName RegisterUser
        * @apiGroup Auth
        *
        * @apiParam {String} username The user's username.
        * @apiParam {String} password The user's password.
        *
        */
        router.post('/register', (req: any, res: any, next: any) => {
            accountModel.register(new accountModel({username: req.body.username, role: req.body.role}), req.body.password, (err, account) => {
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

    private _initMiscRoutes (router: express.Router) {
        // Get index view
        router.get('/', (req: any, res: any) => {
            res.render('routes/index', { user: req.user});
        });

        /**
        * @api {get} /ping Test the server's connection
        * @apiName PingServer
        * @apiGroup Utils
        *
        */
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