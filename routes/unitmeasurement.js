/**
 * Created by jonathan on 02/01/16.
 */
var express = require('express');
var router = express.Router();
var UnitMeasurementController = require('../controllers/UnitMeasurementController.js');
var validator = require('validator');
var auth = require('../config/auth');

router.get('/', auth.ensureAuthenticated, function (req, res, next) {
    UnitMeasurementController.list(function (resp) {
        res.json(resp);
    });
});

router.get('/:id', auth.ensureAuthenticated, function (req, res, next) {
    UnitMeasurementController.id = (validator.trim(validator.escape(req.params.id)));
    UnitMeasurementController.unit(function (resp) {
        res.json(resp);
    });
});

router.post('/', auth.ensureAuthenticated, function (req, res, next) {
    UnitMeasurementController.description = (validator.trim(validator.escape(req.body.description)));
    UnitMeasurementController.prefix = (validator.trim(validator.escape(req.body.prefix)));
    UnitMeasurementController.factor = (validator.trim(validator.escape(req.body.factor)));

    req.checkBody('description', 'Descrição não informada.').notEmpty();
    req.checkBody('prefix', 'Cód. Unidade não informada.').notEmpty();
    req.checkBody('factor', 'fator não informado.').notEmpty();

    // Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.json({ error: errors });
    } else {
        UnitMeasurementController.save(function (resp) {
            res.json(resp);
        });
    }
});

router.put('/', auth.ensureAuthenticated, function (req, res, next) {
    UnitMeasurementController.id = (validator.trim(validator.escape(req.body.id)));
    UnitMeasurementController.description = (validator.trim(validator.escape(req.body.description)));
    UnitMeasurementController.prefix = (validator.trim(validator.escape(req.body.prefix)));
    UnitMeasurementController.factor = (validator.trim(validator.escape(req.body.factor)));

    req.checkBody('description', 'Descrição não informada.').notEmpty();
    req.checkBody('prefix', 'Cód. Unidade não informada.').notEmpty();
    req.checkBody('factor', 'fator não informado.').notEmpty();
    req.checkBody('id', 'id não informado.').notEmpty();


    // Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.json({ error: errors });
    } else {
        UnitMeasurementController.update(function (resp) {
            res.json(resp);
        });
    }
});

router.delete('/:id', auth.ensureAuthenticated, function (req, res, next) {
    UnitMeasurementController.id = (validator.trim(validator.escape(req.params.id)));
    UnitMeasurementController.remove(function (resp) {
        res.json(resp);
    });
});

module.exports = router;