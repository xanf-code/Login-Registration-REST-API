const Joi = require('@hapi/joi');

const RegistrationValidation = (data) => {
    const ValScheme = Joi.object({
        name : Joi.string().min(6).required(),
        email : Joi.string().min(5).required().email(),
        password : Joi.string().min(6).required()
    });
    return ValScheme.validate(data);
};

const LoginValidation = (data) => {
    const ValScheme = Joi.object({
        email : Joi.string().min(5).required().email(),
        password : Joi.string().min(6).required()
    });
    return ValScheme.validate(data);
}

module.exports.RegistrationValidation = RegistrationValidation;
module.exports.LoginValidation = LoginValidation;
