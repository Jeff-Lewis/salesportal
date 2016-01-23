/**
 * Created by jonathan on 11/12/15.
 */
var db = require('../connection/connection.js');

var productSchema = db.mong.Schema({
    code: {
        type:String,
        index: true,
        required:true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    unitmeasurement: {
        type: String,
        required: true
    }
});

exports.products = db.mong.model('products', productSchema);