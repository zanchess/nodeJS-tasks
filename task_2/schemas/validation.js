import Joi from 'joi';

const userSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
});

export default userSchema;
