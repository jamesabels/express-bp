'use strict';
import * as express from 'express';

export default class UserRoute {
    app;
    constructor (app: any ) {
        this.app = app;
    }

    init () {
        let router = express.Router();

        /* GET users listing. */
        router.get('/', function (req: express.Request, res: express.Response, next: any) {
            res.send('respond with a resource');
        });

        return router;
    }
}
