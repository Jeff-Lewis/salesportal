/**
 * Created by Jonathan on 06/12/2015.
 */
var model = require('../models/ClientModel.js');
var validator = require('validator');

var id = 0;
var index = 0;
var name = '';
var address = [];
var addr = {
    id: '',
    index: 0,
    address: '',
    number: '',
    district: ''
};


exports.list = function (callback) {
    model.clients.find({}, function (err, clients) {
        if (err) {
            callback({ error: 'Não foi possível buscar os clients.' });
        } else {
            callback(clients);
        }
    });
};

exports.client = function (callback) {
    model.clients.findById(this.id, function (err, client) {
        if (err) {
            callback({ error: 'Não foi possível buscar o cliente.' });
        } else {
            callback(client);
        }
    });
};

exports.save = function (callback) {
    new model.clients({
        'name': this.name,
        'index': this.index,
        'address': this.address
    }).save(function (err, client) {
        if (err) {
            if (err.code == '11000'){
                callback({ error: 'Index do Cliente já cadastrado.' });
            }
            else{
                callback({ error: 'Não foi possível Salvar o Cliente.' });
            }

        } else {
            callback(client);
        }
    });
};

exports.update = function (callback) {
    var pclients = new model.clients({
        'id': this.id,
        'name': this.name,
        'index': this.index,
        'address': this.address
    });


    model.clients.update({_id: this.id}, {
            'id':this.id,
            'name': this.name,
            'index': this.index,
            'address': this.address
        }, {upsert: false},
        function(err) {
            if (err) {
                callback({ error: 'Não foi possível atualizar o cliente.' });
            } else {
                callback(pclients);
            }
        });
    /*var pid = this.id;
    var pname = this.name;
    model.clients.findById(this.id, function (err, Client) {
        Client.id = pid;
        Client.name = pname;
        Client.save(function (err, Client) {
            if (err) {
                callback({ error: 'Não foi possível Atualizar o Cliente.' });
            } else {
                callback(Client);
            }

        });
    });*/
};

exports.remove = function (callback) {
    model.clients.findById(this.id, function (err, Client) {
        if (err) {
            callback({ error: 'Não foi possível buscar o Cliente.' });
        } else {

            Client.remove(function (err) {
                if (!err) {
                    callback({ response: 'Cliente excluído com sucesso.' });
                }
            });
        }
    });
};

exports.clientsJSON = {
    id:{
        trim: true,
        validate: function(value, name) {
            if (value) {
                if (!validator.isMongoId(value)) {
                    return {
                        isValid: false,
                        message: 'id do cliente não é válido.'
                    };
                }
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    name:{
        required: true,
        validate: function(value, name) {
            if (validator.isNull(value)){
                return {
                    isValid: false,
                    message: 'Nome é obrigatório.'
                };
            }
            return {
                isValid: true,
                message: ''
            };
        }
    },
    address: [{
        index: {
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Index do endereço é obrigatório.'
                    };
                }
                if (!validator.isInt(value)){
                    return {
                        isValid: false,
                        message: 'Index do endereço somente permite valores numéricos.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        address:{
            required: true,
            validate: function(value, name) {
                if (validator.isNull(value)){
                    return {
                        isValid: false,
                        message: 'Endereço é obrigatório.'
                    };
                }
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        number:{
            validate: function(value, name) {
                return {
                    isValid: true,
                    message: ''
                };
            }
        },
        district:{
            validate: function(value, name) {
                return {
                    isValid: true,
                    message: ''
                };
            }
        }
    }]
};