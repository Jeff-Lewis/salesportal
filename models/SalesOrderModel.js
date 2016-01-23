/**
 * Created by jonathan on 19/12/15.
 */
var db = require('../connection/connection.js');

var salesordemitemSchema = db.mong.Schema({
    index: {
        type: Number,
        required: true,
        index: true
    },
    iditem: {
        type:  db.mong.Schema.Types.ObjectId,
        ref: 'products',
        required:true,
        index:true
    },
    quantity:{
        type: Number,
        required:true
    },
    value:{
        type: Number,
        required:true
    },
    totalitem:{
        type: Number,
        required:true
    }
});


var salesorderSchema = db.mong.Schema({
    idclient: {
        type: db.mong.Schema.Types.ObjectId,
        ref: 'clients',
        required:true,
        index:true
    },
    date:{
        required: true,
        type: Date,
        index: true
    },
    modifieddate:{
        required: true,
        type: Date,
        index: true
    },
    status: {
        required: true,
        type: Number,
        index: true
    },
    quantityitems:{
        required: true,
        type: Number
    },
    totalvalue:{
        required: true,
        type: Number
    },
    items:[
        salesordemitemSchema
    ]
});

exports.salesorder = db.mong.model('salesorders', salesorderSchema);

