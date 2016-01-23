/**
 * Created by jonathan on 12/12/15.
 */
var jwt    = require('jsonwebtoken');

module.exports = {

    'secret': 'jonathan'// + Date.now()
};

module.exports.login = function(user, secretkey) {
     return jwt.sign(user, secretkey, {
        expiresInMinutes: 1440 // expires in 24 hours
    });
};

module.exports.tokenVerify = function (token, req, callback) {
    if (token) {

        jwt.verify(token, req.superSecret, function (err, decoded) {
            if (err) {
                callback({
                    auth: {
                        success: false
                    },
                    values: {
                        message: 'Token Inválido.'
                    }
                });
            } else {
                callback({
                    auth: {
                        success: true
                    },
                    values: {
                        token: token
                    }
                });
            }
        });

    }
    else {

        callback({
            auth: {
                success: false
            },
            values: {
                message: 'Nenhum token informado.'
            }
        });
    }


};

module.exports.ensureAuthenticated = function(req, res, next) {

    var token = req.token;

    if (token) {

        jwt.verify(token, req.superSecret, function(err, decoded) {
            if (err) {
                return res.json({
                    auth: {
                        success: false
                    },
                    values : {
                        message: 'Token Inválido.'
                    }
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            auth: {
                success: false
            },
            values : {
                message: 'Nenhum token informado.'
            }
        });

    }

};