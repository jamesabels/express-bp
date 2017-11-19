'use strict';
import * as express from 'express';

export default class UserRoute {
    app;
    router;
    constructor (app: any ) {
        this.app = app;
        this.router = express.Router();
    }

    init () {
        /**
        * @api {get} /users Request a list of all users
        * @apiName GetUsers
        * @apiGroup Users
        *
        * @apiSuccess {Array} users An array of user objects.
        */
        this.router.get('/', function (req: express.Request, res: express.Response, next: any) {
            res.status(200).send('TODO: Query list of users');
        });

        /**
        * @api {get} /user/:id Request User information by ID
        * @apiName GetUserById
        * @apiGroup Users
        *
        * @apiParam {Number} id Users unique ID.
        *
        * @apiSuccess {String} firstname First name of the User.
        * @apiSuccess {String} lastname  Last name of the User.
        * @apiSuccess {String} role User's account role.
        */
        this.router.get('/:id', function (req: express.Request, res: express.Response, next: any) {
            res.status(200).send(`TODO: Query list of users by ID ${req.params.id}`);
        });

        return this.router;
    }
}
