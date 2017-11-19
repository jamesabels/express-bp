'use strict';
import * as express from 'express';
import * as passport from 'passport';
import * as path from 'path';
import { accountModel } from '../models/account';

export default class IndexRoute {
    app;
    router;
    constructor (app: any) {
        this.app = app;
        this.router = express.Router();
    }

    private _initMiscRoutes (router: express.Router) {
        /**
        * @api {get} /ping Test the server's connection
        * @apiName PingServer
        * @apiGroup Utils
        */
        router.get('/ping', (req: any, res: any) => {
            res.status(200).send('pong!');
        });
    }

    init () {
        this._initMiscRoutes(this.router);
        return this.router;
    }
}