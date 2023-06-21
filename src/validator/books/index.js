// need to rewrite

const InvariantError = require('../../exceptions/InvariantError');
const { BookPayloadSchema } = require('./schema');

const BooksValidator = {
  validateBookPayload: (payload) => {
    const validationResult = BookPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = BooksValidator;
