/**
 * Created by jonathan on 02/01/16.
 */
var model = require('../models/UnitMeasurementModel.js');

var id = 0;
var prefix = '';
var description = '';
var factor = 0;


exports.list = function (callback) {
    model.unitMeasurements.find({}, function (err, unities) {
        if (err) {
            callback({ error: 'Não foi possível buscar as unidades de medida.' });
        } else {
            callback(unities);
        }
    });
};

exports.unit = function (callback) {
    model.unitMeasurements.findById(this.id, function (err, unit) {
        if (err) {
            callback({ error: 'Não foi possível buscar a unidade de medida.' });
        } else {
            callback(unit);
        }
    });
};

exports.save = function (callback) {
    var pprefix = this.prefix;
    var pdescription = this.description;
    var pfactor = this.factor;

    new model.unitMeasurements({
        'prefix': pprefix,
        'description': pdescription,
        'factor': pfactor
    }).save(function (err, unit) {
            if (err) {
                if (err.code == '11000'){
                    callback({ error: 'Unidade de medida já cadastrada.' });
                }
                else{
                    callback({ error: 'Não foi possível salvar a unidade de medida.' });
                }
            } else {
                callback(unit);
            }
        });
};

exports.update = function (callback) {
    var pid = this.id;
    var pprefix = this.prefix;
    var pdescription = this.description;
    var pfactor = this.factor;

    model.unitMeasurements.findById(this.id, function (err, Unit) {
        Unit.id = pid;
        Unit.prefix = pprefix;
        Unit.description = pdescription;
        Unit.factor = pfactor;
        Unit.save(function (err, Unit) {
            if (err) {
                callback({ error: 'Não foi possível atualizar a unidade de medida.' });
            } else {
                callback(Unit);
            }
        });
    });
};

exports.remove = function (callback) {
    model.unitMeasurements.findById(this.id, function (err, Unit) {
        if (err) {
            callback({ error: 'Não foi possível buscar a unidade de medida.' });
        } else {
            Unit.remove(function (err) {
                if (!err) {
                    callback({ response: 'Unidade de medida excluída com sucesso.' });
                }
            });
        }
    });
};