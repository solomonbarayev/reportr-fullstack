const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateURL = (v: string) => {
    if (!validator.isURL(v)) {
        throw new Error('string.uri');
    }
    return v;
};

const validateAuthentication = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Must be a valid email',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(8).required().messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters'
        })
    })
});

const validateEmployee = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Must be a valid email',
            'any.required': 'Email is required'
        }),
        password: Joi.string().min(8).required().messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 8 characters'
        }),
        firstName: Joi.string().required().messages({
            'any.required': 'First name is required'
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'Last name is required'
        }),
        position: Joi.string().required().messages({
            'any.required': 'Position is required'
        }),
        picture: Joi.string().custom(validateURL).messages({
            'string.uri': 'Must be a valid URL'
        }),
        isManager: Joi.boolean(),
        mySubordinates: Joi.array()
            .items(
                Joi.string().custom((v: string) => {
                    if (!ObjectId.isValid(v)) {
                        throw new Error('string.objectId');
                    }
                    return v;
                })
            )
            .messages({
                'string.objectId': 'Must be a valid ObjectId'
            })
    })
});

const validateObjectId = celebrate({
    params: Joi.object().keys({
        id: Joi.string()
            .required()
            .custom((value: string, helpers: { message(text: string): string }) => {
                if (!ObjectId.isValid(value)) {
                    return helpers.message('ObjectId is not valid');
                }
                return value;
            })
    })
});

const validateTask = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().messages({
            'any.required': 'Title is required'
        }),
        dueDate: Joi.string().required().messages({
            'any.required': 'Due date is required'
        })
    })
});

const validateReport = celebrate({
    body: Joi.object().keys({
        text: Joi.string().required().messages({
            'any.required': 'Text is required'
        }),
        date: Joi.string().required().messages({
            'any.required': 'Date is required'
        })
    })
});

export { validateAuthentication, validateEmployee, validateObjectId, validateTask, validateReport };
