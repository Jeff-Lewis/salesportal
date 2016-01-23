var express = require('express');
var router = express.Router();
var userController = require('../controllers/UsersController.js');
var validator = require('validator');
var auth = require('../config/auth');

/* user register */
router.get('/', auth.ensureAuthenticated, function (req, res, next) {
  userController.list(function (resp) {
    res.json(resp);
  });
});

router.get('/:id', auth.ensureAuthenticated, function (req, res, next) {
  userController.id = (validator.trim(validator.escape(req.params.id)));
  userController.user(function (resp) {
    res.json(resp);
  });
});

router.post('/', auth.ensureAuthenticated, function (req, res, next) {

  userController.name = (validator.trim(validator.escape(req.body.name)));
  userController.password = (validator.trim(req.body.password));
  userController.index = (validator.trim(validator.escape(req.body.index)));
  userController.email = (validator.trim(validator.escape(req.body.email)));

  req.checkBody('name', 'Nome não informado.').notEmpty();
  req.checkBody('password', 'Senha não informada.').notEmpty();
  req.checkBody('index', 'Index não informado.').notEmpty();
  req.checkBody('index', 'Index não é válido.').isInt();
  req.checkBody('email', 'E-mail não informado.').notEmpty();
  req.checkBody('email', 'E-mail não é válido.').isEmail();
  req.checkBody('passwordbis', 'Senhas não coincidem.').equals(userController.password);

  // Check for errors
  var errors = req.validationErrors();
  if (errors) {
    res.json({ error: errors });
  } else {
    userController.save(function (resp) {
      res.json(resp);
    });
  }
});

router.put('/', auth.ensureAuthenticated, function (req, res, next) {
  userController.id = (validator.trim(validator.escape(req.body.id)));
  userController.name = (validator.trim(validator.escape(req.body.name)));
  userController.password = (validator.trim(req.body.password));
  userController.index = (validator.trim(validator.escape(req.body.index)));
  userController.email = (validator.trim(validator.escape(req.body.email)));

  req.checkBody('id', 'id não informado').notEmpty();
  req.checkBody('name', 'Nome não informado').notEmpty();
  req.checkBody('password', 'Senha não informada').notEmpty();
  req.checkBody('index', 'Index não informado.').notEmpty();
  req.checkBody('index', 'Index não é válido.').isInt();
  req.checkBody('email', 'E-mail não informado.').notEmpty();
  req.checkBody('email', 'E-mail não é válido.').isEmail();
  req.checkBody('passwordbis', 'Senhas não coincidem.').equals(userController.password);

  // Check for errors
  var errors = req.validationErrors();
  if (errors) {
    res.json({ error: errors });
  } else {
    userController.update(function (resp) {
      res.json(resp);
    });
  }
});

router.delete('/:id', auth.ensureAuthenticated, function (req, res, next) {
  userController.id = (validator.trim(validator.escape(req.params.id)));
  userController.remove(function (resp) {
    res.json(resp);
  });
});
/* user register */

/* login */
router.post('/authenticate', function(req, res) {
  if (req.body.keytoken) {
    auth.tokenVerify(req.body.keytoken, req, function(result){
      res.json(result);
    });
  }
  else {
    var username = (validator.trim(validator.escape(req.body.name)));
    if (validator.isEmail(username)){

      userController.userByEmail(username,
          function (err, user) {

            if (err) throw err;

            if (!user) {
              res.json({
                auth: {
                  success: false
                },
                values: {
                  message: 'Usuário/Senha não coincidem.'
                }
              });
            } else if (user) {

              userController.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                  res.json({
                    auth: {
                      success: false
                    },
                    values: {
                      message: 'Usuário/Senha não coincidem.'
                    }
                  });
                }
                else {
                  var token = auth.login(user, req.superSecret);

                  res.json({
                    auth: {
                      success: true
                    },
                    values: {
                      message: 'login Ok',
                      token: token
                    }
                  });
                }
              });
            }
          });
    }
    else {
      userController.userByUsername(username,
          function (err, user) {

            if (err) throw err;

            if (!user) {
              res.json({
                auth: {
                  success: false
                },
                values: {
                  message: 'Usuário/Senha não coincidem.'
                }
              });
            } else if (user) {

              userController.comparePassword(req.body.password, user.password, function (err, isMatch) {
                if (!isMatch) {
                  res.json({
                    auth: {
                      success: false
                    },
                    values: {
                      message: 'Usuário/Senha não coincidem.'
                    }
                  });
                }
                else {
                  var token = auth.login(user, req.superSecret);

                  res.json({
                    auth: {
                      success: true
                    },
                    values: {
                      message: 'login Ok',
                      token: token
                    }
                  });
                }
              });
            }
          });
    }
  }
});

/* login */

module.exports = router;
