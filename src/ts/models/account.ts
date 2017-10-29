import * as mongoose from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

let Schema = mongoose.Schema;

let account = new Schema({
    username: String,
    password: String,
    role: String,
});

account.plugin(passportLocalMongoose);

export const accountModel = mongoose.model('accounts', account);
