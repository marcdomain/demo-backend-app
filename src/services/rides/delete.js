const joi = require('joi');
const db = require('../../models');

const schema = joi.object({
  rideId: joi.number().integer().required(),
  accountId: joi.number().integer().required(),
});

exports.deleteRide = async req => {
	try {
    const validatedParams = await schema.validateAsync(req);

    const { rideId, accountId } = validatedParams;

    const ride = await db.rides.findOne({ where: {id: rideId, accountId } });

    if (!ride) return {
      status: 404,
			success: false,
			message: 'Ride not found',
			data: ride,
    }

    await ride.destroy();

    return {
			status: 200,
			success: true,
			message: 'Ride deleted successfully',
			data: ride,
		};
	} catch (error) {
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
