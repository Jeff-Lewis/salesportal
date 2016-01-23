/**
 * Created by jonathan on 02/01/16.
 */
var db = require('../connection/connection.js');
var unitMeasurementSchema = db.mong.Schema({
    prefix:{
        type:String,
        index: true,
        unique : true,
        required : true
    },
    description:{
        type: String,
        required : true
    },
    factor: {
        type: Number,
        required : true
    }
});

exports.unitMeasurements = db.mong.model('unitMeasurements', unitMeasurementSchema);