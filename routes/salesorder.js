/**
 * Created by jonathan on 19/12/15.
 */
var express = require('express');
var router = express.Router();
var salesOrderController = require('../controllers/SalesOrderController.js');
var validator = require('validator');
var auth = require('../config/auth');
var jsonValidator = require('json-validator');




router.get('/', auth.ensureAuthenticated, function (req, res, next) {

    salesOrderController.list(function (resp) {
        res.json(resp);
    });
});

router.get('/:id', auth.ensureAuthenticated, function (req, res, next) {
    salesOrderController.id = (validator.trim(validator.escape(req.params.id)));
    salesOrderController.salesorder(function (resp) {
        res.json(resp);
    });
});

router.post('/', auth.ensureAuthenticated, function (req, res, next) {

    if(validator.isJSON(JSON.stringify(req.body))){

        jsonValidator.validate(JSON.stringify(req.body), salesOrderController.salesorderJSON, function(err, messages) {
            if(err) {
                throw err;
            }

            if (JSON.stringify(messages).length > 2) {

                var errors = [];

                for (var key in messages) {
                    errors.push({ msg: messages[key][0]});
                }
                res.json({ error: errors });
            }
            else {
                var json = JSON.stringify(req.body, null, 4);
                json = JSON.parse(json);

                salesOrderController.idclient = json.idclient;
                salesOrderController.date = json.date;
                salesOrderController.modifieddate = Date.now();
                salesOrderController.status = json.status;
                salesOrderController.quantityitems = json.quantityitems;
                salesOrderController.totalvalue = json.totalvalue;

                salesOrderController.items = [];
                for(i=0, leng=json.items.length; i< leng; i++){
                    salesOrderController.items.push({
                        index:i+1,
                        iditem:json.items[i].iditem,
                        quantity:json.items[i].quantity,
                        value:json.items[i].value,
                        totalitem:json.items[i].totalitem
                    });
                }

                salesOrderController.save(function (resp) {
                    res.json(resp);
                });
            }
        });
    }
    else {
        res.json(req.body);
    }
});

router.put('/', auth.ensureAuthenticated, function (req, res, next) {
    if(validator.isJSON(JSON.stringify(req.body))){

        jsonValidator.validate(JSON.stringify(req.body), salesOrderController.salesorderJSON, function(err, messages) {
            if(err) {
                throw err;
            }

            if (JSON.stringify(messages).length > 2) {

                var errors = [];

                for (var key in messages) {
                    errors.push({ msg: messages[key][0]});
                }
                res.json({ error: errors });
            }
            else {
                var json = JSON.stringify(req.body, null, 4);
                json = JSON.parse(json);
                salesOrderController.id = json.id;
                salesOrderController.idclient = json.idclient;
                salesOrderController.date = json.date;
                salesOrderController.modifieddate = Date.now();
                salesOrderController.status = json.status;
                salesOrderController.quantityitems = json.quantityitems;
                salesOrderController.totalvalue = json.totalvalue;

                salesOrderController.items = [];
                for(i=0, leng=json.items.length; i< leng; i++){
                    salesOrderController.items.push({
                        index:i+1,
                        id:json.items[i].id,
                        iditem:json.items[i].iditem,
                        quantity:json.items[i].quantity,
                        value:json.items[i].value,
                        totalitem:json.items[i].totalitem
                    });
                }

                salesOrderController.update(function (resp) {
                    res.json(resp);
                });
            }
        });
    }
    else {
        res.json(req.body);
    }
});

router.delete('/:id', auth.ensureAuthenticated, function (req, res, next) {
    salesOrderController.id = (validator.trim(validator.escape(req.params.id)));
    salesOrderController.remove(function (resp) {
        res.json(resp);
    });
});

module.exports = router;