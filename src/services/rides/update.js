const joi = require('joi');
const db = require('../../models');

const schema = joi.object({
  rideId: joi.number().integer().required(),
  accountId: joi.number().integer().required(),
  paymentMethod: joi.string().valid('CASH', 'CARD'),
  promoCode: joi.string().trim().max(15),
});

exports.update = async req => {
	try {
    const validatedParams = await schema.validateAsync(req);

    const { rideId, accountId, paymentMethod, promoCode } = validatedParams;

    const ride = await db.rides.findOne({ where: {id: rideId, accountId } });

    if (!ride) return {
      status: 404,
			success: false,
			message: 'Ride not found',
			data: ride,
    }

    const payload = {
      accountId,
      paymentMethod,
      promoCode
    }

    const [, updatedRide] = await db.rides.update(
      payload,
      {
        where: { id: rideId },
        returning: true,
      }
    );

    return {
			status: 200,
			success: true,
			message: 'Ride updated successfully',
			data: updatedRide[0],
		};
	} catch (error) {
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
