const Joi = require('joi');
const Boom = require('boom');

const laptopValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    brand_id: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const deleteLaptopValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required()
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};
module.exports = { laptopValidation, deleteLaptopValidation };
