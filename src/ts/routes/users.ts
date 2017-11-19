'use strict';
import * as express from 'express';

export default class UserRoute {
    app;
    constructor (app: any ) {
        this.app = app;
    }

    init () {
        let router = express.Router();

        /**
        * @api {get} /users Request a list of all users
        * @apiName GetUsers
        * @apiGroup Users
        *
        * @apiSuccess {Array} users An array of user objects.
        */
        router.get('/users', function (req: express.Request, res: express.Response, next: any) {
            res.send('TODO: Query user by ID');
        });

        /**
        * @api {get} /user/:id Request User information by ID
        * @apiName GetUserById
        * @apiGroup User
        *
        * @apiParam {Number} id Users unique ID.
        *
        * @apiSuccess {String} firstname First name of the User.
        * @apiSuccess {String} lastname  Last name of the User.
        * @apiSuccess {String} role User's account role.
        */
        router.get('/user/:id', function (req: express.Request, res: express.Response, next: any) {
            res.send('TODO: Query user by ID');
        });

        return router;
    }
}
