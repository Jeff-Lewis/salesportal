/**
 * Created by jonathan on 11/12/15.
 */
var express = require('express');
var router = express.Router();
var productController = require('../controllers/ProductController.js');
var validator = require('validator');
var auth = require('../config/auth');

router.get('/', auth.ensureAuthenticated, function (req, res, next) {
    productController.list(function (resp) {
        res.json(resp);
    });
});

router.get('/:id', auth.ensureAuthenticated, function (req, res, next) {
    productController.id = (validator.trim(validator.escape(req.params.id)));
    productController.product(function (resp) {
        res.json(resp);
    });
});

router.post('/', auth.ensureAuthenticated, function (req, res, next) {
    productController.description = (validator.trim(validator.escape(req.body.description)));
    productController.value = (validator.trim(validator.escape(req.body.value)));
    productController.code = (validator.trim(validator.escape(req.body.code)));
    productController.unitmeasurement = (validator.trim(validator.escape(req.body.unitmeasurement)));

    req.checkBody('description', 'Descrição não informada.').notEmpty();
    req.checkBody('value', 'Valor não informado.').notEmpty();
    req.checkBody('code', 'Cód. Produto não informado.').notEmpty();
    req.checkBody('unitmeasurement', 'Unidade de Medida não informada.').notEmpty();

    // Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.json({ error: errors });
    } else {
        productController.save(function (resp) {
            res.json(resp);
        });
    }
});

router.put('/', auth.ensureAuthenticated, function (req, res, next) {
    productController.id = (validator.trim(validator.escape(req.body.id)));
    productController.description = (validator.trim(validator.escape(req.body.description)));
    productController.value = (validator.trim(validator.escape(req.body.value)));
    productController.code = (validator.trim(validator.escape(req.body.code)));
    productController.unitmeasurement = (validator.trim(validator.escape(req.body.unitmeasurement)));

    req.checkBody('id', 'id não informado.').notEmpty();
    req.checkBody('description', 'Descrição não informada.').notEmpty();
    req.checkBody('value', 'Valor não informado.').notEmpty();
    req.checkBody('code', 'Cód. Produto não informado.').notEmpty();
    req.checkBody('unitmeasurement', 'Unidade de Medida não informada.').notEmpty();

    // Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.json({ error: errors });
    } else {
        productController.update(function (resp) {
            res.json(resp);
        });
    }
});

router.delete('/:id', auth.ensureAuthenticated, function (req, res, next) {
    productController.id = (validator.trim(validator.escape(req.params.id)));
    productController.remove(function (resp) {
        res.json(resp);
    });
});

module.exports = router;