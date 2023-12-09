const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors), false);
}

const validateFamily = (req, res, next) => {
    const validationRules = {
        fname: 'required|string|',
        lname: 'required|string|',
        gender: 'required|string|',
        birthday: 'required|string|',
        baptism: 'required|string|',
        confirmation: 'required|string|',
        initiatory: 'required|string|',
        endowment: 'required|string|',
        sealing: 'required|string|'
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else{
            next();
        }
    })
};

const validateTemple = (req, res, next) => {
    const validationRules = {
        templeId: 'required|int',
        templeName: 'required|string',
        templeAddress: 'required|string'
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else{
            next();
        }
    })
};

const validateUser = (req, res, next) => {
    const validationRules = {
        userName: 'required|string',
        userPassword: 'required|string'
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status){
            res.status(422).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else{
            next();
        }
    })
};

const validateCompleted = (req, res, next) => {
    const validationRules = {
        fname: 'required|string',
        lname: 'required|string',
        gender: 'required|string',
        birthday: 'required|string',
        baptism: 'required|string',
        confirmation: 'required|string',
        initiatory: 'required|string',
        endowment: 'required|string',
        sealing: 'required|string'
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else{
            next();
        }
    })
};

const validateId = (req, res, next) => {
    const validationRule = {
        id: 'required|alpha_num|size:24'
      }
      validator(req.params, validationRule, {}, (err, status) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
          });
        } else {
          next();
        }
      });
};

const { requiresAuth } = require('express-openid-connect');

module.exports = {
    validateFamily,
    validateCompleted,
    validateTemple,
    validateUser,
    validateId,
    requiresAuth
};