/**
 * Created by jonathan on 11/12/15.
 */
var db = require('../connection/connection.js');
var usersSchema = db.mong.Schema({
    index:{
        type:Number,
        index: true,
        unique : true,
        required : true
    },
    email:{
        type: String,
        index: true,
        unique : true,
        required : true
    },
    name: {
        type: String,
        index: true,
        unique : true,
        required : true
    },
    password: {
        type: String,
        required: true,
        bcrypt : true
    }
});

exports.users = db.mong.model('users', usersSchema);