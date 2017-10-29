'use strict';

// dependencies
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as local from 'passport-local';
import * as flash from 'connect-flash';

// Import Routes
import IndexRoute from './routes/index';
import UserRoute from './routes/users';

// Import Models
import { accountModel } from './models/account';

let app = express();
let localStrategy = local.Strategy;

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.set('view options', {layout: false});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/public')));

// Define Routes
let index = new IndexRoute(app).init();
let users = new UserRoute(app).init();

app.use('/', index);
app.use('/users', users);

// passport config
passport.use(new localStrategy(accountModel.authenticate()));
passport.serializeUser(accountModel.serializeUser());
passport.deserializeUser(accountModel.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4', { useMongoClient: true });

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
    let err = new Error('Not Found');
    err.message = '404';
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err: any, req: any, res: any, next: any) {
        res.status(err.status || 500);
        res.render('components/universal/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err: any, req: any, res: any, next: any) {
    res.status(err.status || 500);
    res.render('components/universal/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;