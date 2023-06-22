const Joi = require('joi');

const customMessages = {
  'any.required': 'Mohon isi nama buku',
};

const BookPayloadSchema = Joi.object({
  name: Joi.string().required().messages(customMessages),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  readPage: Joi.number().integer(Joi.ref('pageCount')).required(),
  reading: Joi.boolean().required(),
});

module.exports = { BookPayloadSchema };
