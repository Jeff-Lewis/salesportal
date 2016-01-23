/**
 * Created by jonathan on 19/12/15.
 */
var model = require('../models/SalesOrderModel.js');
var validator = require('validator');

var id = '';
var idclient = '';
var date =  Date.now();
var modifieddate = Date.now();
var status = 0;
var quantityitems = 0;
var totalvalue = 0;
var items = [];
var item = {
    id:'',
    index: 0,
    iditem: '',
    quantity: 0,
    value:0,
    totalitem: 0
};


exports.list = function (callback) {
    model.salesorder.find()
        .populate('idclient')
        .populate('items.iditem')
        .exec(function (err, salesorder) {
        if (err) {
            callback({ error: 'Não foi possível buscar os pedidos.' });
        } else {
            callback(salesorder);
        }
    });
};

exports.salesorder = function (callback) {
    model.salesorder.findById(this.id)
        .populate('idclient')
        .populate('items.iditem')
        .exec(function (err, salesorder) {
            if (err) {
                callback({ error: 'Não foi possível buscar os pedido.' });
            } else {
                callback(salesorder);
            }
        });
};

exports.save = function (callback) {
    new model.salesorder({
        'idclient' : this.idclient,
        'date' : this.date,
        'modifieddate' : this.modifieddate,
        'status' : this.status,
        'quantityitems' : this.quantityitems,
        'totalvalue' : this.totalvalue,
        'items' : this.items
    }).save(function (err, salesorder) {
        if(err){
            callback({ error: 'Não foi possível salvar a ordem de venda' });
        }
        else {
            callback(salesorder)
        }
    });
};

exports.update = function (callback) {
    var psalesorder = new model.salesorder({
        'idclient' : this.idclient,
        'date' : this.date,
        'modifieddate' : this.modifieddate,
        'status' : this.status,
        'quantityitems' : this.quantityitems,
        'totalvalue' : this.totalvalue,
        'items' : this.items
    });


    model.salesorder.update({_id: this.id}, {
        'id':this.id,
        'idclient' : this.idclient,
        'date' : this.date,
        'modifieddate' : this.modifieddate,
        'status' : this.status,
        'quantityitems' : this.quantityitems,
        'totalvalue' : this.totalvalue,
        'items' : this.items
    }, {upsert: false},
    function(err) {
        if (err) {
            console.log(err);
            callback({ error: 'Não foi possível atualizar o pedido.' });
        } else {
            callback(psalesorder);
        }
    });
};

exports.remove = function (callback) {
    model.salesorder.findById(this.id, function (err, salesorder) {
        if (err) {
            callback({ error: 'Não foi possível buscar o pedido.' });
        } else {

            salesorder.remove(function (err) {
                if (!err) {
                    callback({ response: 'Pedido excluído com sucesso.' });
                }
            });
        }
    });
};

exports.salesorderJSON = {
    id:{
        trim: true,
        validate: function(value, name) {
            if (value) {
                if (!validator.isMongoId(value)) {
                    return {
                        isValid: false,
                        message: 'id do pedido não é válido.'
                    };
                }
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    idclient:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'id do cliente é obrigatório.'
                };
            }
            if (!validator.isMongoId(value)){
                return {
                    isValid: false,
                    message: 'id do cliente não é válido.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    date:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Data do pedido é obrigatória.'
                };
            }
            if (!validator.isDate(value)){
                return {
                    isValid: false,
                    message: 'Data do pedido somente permite Datas.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    modifieddate:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Data de modificação é obrigatória.'
                };
            }
            if (!validator.isDate(value)){
                return {
                    isValid: false,
                    message: 'Data de modificação somente permite Datas.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    status:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Status do pedido é obrigatório.'
                };
            }
            if (!validator.isInt(value)){
                return {
                    isValid: false,
                    message: 'Status somente permite valores numéricos.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    quantityitems:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Qtd. de itens do pedido é obrigatório.'
                };
            }
            if (!validator.isInt(value)){
                return {
                    isValid: false,
                    message: 'Qtd. de itens do pedido somente permite valores numéricos.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    totalvalue:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Total do pedido é obrigatório.'
                };
            }
            if (!validator.isDecimal(value)){
                return {
                    isValid: false,
                    message: 'Total do pedido não é válido.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    items: [{
        index: {
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Qtd. do item do pedido é obrigatório.'
                    };
                }
                if (!validator.isInt(value)){
                    return {
                        isValid: false,
                        message: 'Qtd. do item do pedido somente permite valores numéricos.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        iditem:{
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'id do item é obrigatório.'
                    };
                }
                if (!validator.isMongoId(value)){
                    return {
                        isValid: false,
                        message: 'id do item não é válido.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        quantity:{
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Qtd. do item é obrigatório.'
                    };
                }
                if (!validator.isDecimal(value)){
                    return {
                        isValid: false,
                        message: 'Qtd. do item não é válido.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        value:{
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Valor do item é obrigatório.'
                    };
                }
                if (!validator.isDecimal(value)){
                    return {
                        isValid: false,
                        message: 'Valor do item não é válido.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        totalitem:{
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Total do item é obrigatório.'
                    };
                }
                if (!validator.isDecimal(value)){
                    return {
                        isValid: false,
                        message: 'Total do item não é válido.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        }
    }]
};