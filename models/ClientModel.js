/**
 * Created by Jonathan on 06/12/2015.
 */
var db = require('../connection/connection.js');

var clientAddressSchema = db.mong.Schema({
    index:{
        type: Number,
        required: true,
        index: true
    },
    address:{
        type: String,
        required: true
    },
    number:{
        type: String
    },
    district:{
        type: String
    }
});

var clientsSchema = db.mong.Schema({
    index:{
        type: Number,
        unique: true,
        required: true,
        index: true
    },
    name: {
        required: true,
        type:String
    },
    address : [
        clientAddressSchema
    ]
});

exports.clients = db.mong.model('clients', clientsSchema);