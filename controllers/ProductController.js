/**
 * Created by jonathan on 11/12/15.
 */
var model = require('../models/ProductModel.js');

var id = 0;
var description = '';
var value = '';
var code = '';
var unitmeasurement = '';


exports.list = function (callback) {
    model.products.find({}, function (err, products) {
        if (err) {
            callback({ error: 'Não foi possível buscar os produtos.' });
        } else {
            callback(products);
        }
    });
};

exports.product = function (callback) {
    model.products.findById(this.id, function (err, product) {
        if (err) {
            callback({ error: 'Não foi possível buscar o produto.' });
        } else {
            callback(product);
        }
    });
};

exports.save = function (callback) {
    var pdescription = this.description;
    var pvalue = this.value;
    var pcode = this.code;
    var punitmeasurement = this.unitmeasurement;
    new model.products({
        'description': pdescription,
        'value': pvalue,
        'unitmeasurement': punitmeasurement,
        'code': pcode
    }).save(function (err, product) {
            if (err) {
                if (err.code == '11000'){
                    callback({ error: 'Cód. Produto já cadastrado.' });
                }
                else{
                    callback({ error: 'Não foi possível Salvar o produto.' });
                }
            } else {
                callback(product);
            }
        });
};

exports.update = function (callback) {
    var pid = this.id;
    var pdescription = this.description;
    var pvalue = this.value;
    var punitmeasurement = this.unitmeasurement;

    model.products.findById(this.id, function (err, Product) {
        Product.id = pid;
        Product.description = pdescription;
        Product.value = pvalue;
        Product.unitmeasurement = punitmeasurement;
        Product.save(function (err, Product) {
            if (err) {
                callback({ error: 'Não foi possível Atualizar o produto.' });
            } else {
                callback(Product);
            }
        });
    });
};

exports.remove = function (callback) {
    model.products.findById(this.id, function (err, Product) {
        if (err) {
            callback({ error: 'Não foi possível buscar o produto.' });
        } else {

            Product.remove(function (err) {
                if (!err) {
                    callback({ response: 'Produto excluido com sucesso.' });
                }
            });
        }
    });
};