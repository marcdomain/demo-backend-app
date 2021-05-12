const joi = require('joi');
const db = require('../../models');

const schema = joi.object({
  accountId: joi.number().integer().required(),
  paymentMethod: joi.string().trim().required().valid('CARD', 'CASH'),
  promoCode: joi.string().max(15),
});

exports.create = async req => {
	try {
    const validatedParams = await schema.validateAsync(req);

    const { accountId, paymentMethod, promoCode } = validatedParams;

    const ride = await db.rides.create(
      {
        accountId,
        paymentMethod,
        promoCode,
      },
      {
        include: [
          {
            model: db.accounts,
            attributes: { exclude: ['password'] },
          },
        ],
      },
    );

    return {
			status: 201,
			success: true,
			message: 'Ride created successfully',
			data: ride,
		};
	} catch (error) {
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
