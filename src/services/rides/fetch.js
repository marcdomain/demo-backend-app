const joi = require('joi');
const db = require('../../models');

const schema = joi.object({
  rideId: joi.number().integer(),
  accountId: joi.number().integer().required(),
});

exports.fetch = async req => {
	try {
    const validatedParams = await schema.validateAsync(req);

    const { rideId, accountId } = validatedParams;

    let ride;

    if (rideId ) {
      ride = await db.rides.findOne({
        where: {id: rideId, accountId },
        include: [
          {
            model: db.accounts,
            attributes: ['fullName', 'email', 'phone'],
          },
        ],
      });

      if (!ride) throw new Error('Ride not found');
    } else {
      ride = await db.rides.findAll({
        where: { accountId },
        include: [
          {
            model: db.accounts,
            attributes: ['fullName', 'email', 'phone'],
          },
        ],
      });

      if (!ride.length) throw new Error('Rides not found');
    }

    return {
			status: 200,
			success: true,
			message: 'Ride fetched successfully',
			data: ride,
		};
	} catch (error) {
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
