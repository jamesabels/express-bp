'use strict';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import { accountModel } from '../models/account';

export default class AuthRoute {
    app;
    router;
    constructor (app: any ) {
        this.app = app;
        this.router = express.Router();
    }

    init () {
        // Initialize Route
        this.router.get('/', (req: any, res: any) => {
            res.status(200).send({
                status: '200',
                message: 'OK'
            });
        });

        /**
        * @api {post} /login Login to the server
        * @apiName LoginUser
        * @apiGroup Auth
        *
        * @apiParam {String} username The user's username.
        * @apiParam {String} password The user's password.
        * @apiParam {String} role The user's account role.
        */
        this.router.get('/login', (req: any, res: any) => {
            res.status(200).send('Logged in!');
        });
        this.router.post('/login', passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }), (req: any, res: any, next: any) => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                // TODO: SEND USER ID AND OTHER INFORMATION
                res.status(200).send({
                    username: req.body.username
                });
            });
        });

        /**
        * @api {get} /logout Logout of the server.
        * @apiName LogoutUser
        * @apiGroup Auth
        */
        this.router.get('/logout', (req: any, res: any, next: any) => {
            req.logout();
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).send({
                    status: '200',
                    message: 'User logged out.'
                });
            });
        });

        /**
        * @api {post} /register Register a new account with the server.
        * @apiName RegisterUser
        * @apiGroup Auth
        *
        * @apiParam {String} username The user's username.
        * @apiParam {String} password The user's password.
        */
        this.router.post('/register', (req: any, res: any, next: any) => {
            console.log('REGISTER REQUEST ', req.body);
            accountModel.register(new accountModel({username: req.body.username, role: req.body.role}), req.body.password, (err, account) => {
                passport.authenticate('local')(req, res, () => {
                    req.session.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).send({
                            username: req.body.username,
                            role: req.body.role
                        });
                    });
                });
            });
        });

        return this.router;
    }
}
