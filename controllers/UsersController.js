/**
 * Created by jonathan on 11/12/15.
 */
var model = require('../models/UsersModel.js');
var bcrypt = require('bcrypt');

var id = 0;
var name = '';
var password = '';
var index = 0;
var email = '';


exports.list = function (callback) {
    model.users.find({}, function (err, users) {
        if (err) {
            callback({ error: 'Não foi possível buscar os usuários.' });
        } else {
            callback(users);
        }
    });
};

exports.user = function (callback) {
    model.users.findById(this.id, function (err, user) {
        if (err) {
            callback({ error: 'Não foi possível buscar o usuário.' });
        } else {
            callback(user);
        }
    });
};

module.exports.userByUsername = function(username, callback){

    model.users.findOne({ name: username }, callback);
};

module.exports.userByEmail = function(email, callback){

    model.users.findOne({ email: email }, callback);
};

exports.save = function (callback) {
    var pname = this.name;
    var pindex = this.index;
    var pemail = this.email;

    bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) {
            callback({ error: 'Não foi possível criptografar a senha.' });
        } else {
            new model.users({
                'index': pindex,
                'email': pemail,
                'name': pname,
                'password': hash
            }).save(function (err, user) {
                if (err) {
                    if (err.code == '11000'){
                        callback({ error: 'Usuário e/ou E-mail já cadastrado.' });
                    }
                    else{
                        callback({ error: 'Não foi possível Salvar o usuário.' });
                    }
                } else {
                    callback(user);
                }
            });
        }

    });
};

exports.update = function (callback) {
    var pid = this.id;
    var pname = this.name;
    var ppassword = this.password;
    var pindex = this.index;
    var pemail = this.email;

    bcrypt.hash(ppassword, 10, function (err, hash) {
        if (err) {
            callback({ error: 'Não foi possível criptografar a senha.' });
        } else {
            model.users.findById(pid, function (err, User) {
                User.id = pid;
                User.index = pindex;
                User.password = hash;
                User.save(function (err, User) {
                    if (err) {
                        callback({error: 'Não foi possível Atualizar o usuário.'});
                    } else {
                        callback(User);
                    }

                });
            });
        }
    });
};

exports.remove = function (callback) {
    model.users.findById(this.id, function (err, Client) {
        if (err) {
            callback({ error: 'Não foi possível buscar o usuário.' });
        } else {
            Client.remove(function (err) {
                if (!err) {
                    callback({ response: 'Usuário excluido com sucesso.' });
                }
            });
        }
    });
};

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if (err) return callback(err);
        callback(null, isMatch);
    });
};