const Joi = require('joi');
const Boom = require('boom');

const searchAnimeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const phoneBookValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = { searchAnimeValidation, phoneBookValidation };
