const bcrypt = require('bcryptjs');
const joi = require('joi');
const db = require('../../models');
const createToken = require('../../helpers/createToken');
const { logger } = require('../../helpers/logger');

const schema = joi.object({
  fullName: joi.string().trim().required().min(4).max(50),
  email: joi.string().trim().email().lowercase().required(),
  phone: joi.string().trim().min(8).max(15),
  password: joi.string().trim().required().max(50).min(4),
});

exports.register = async req => {
  const t = await db.sequelize.transaction();

	try {
    const validatedParams = await schema.validateAsync(req);

    const { fullName, email, phone, password } = validatedParams;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

    const [account, created] = await db.accounts.findOrCreate({
      where: { email },
      defaults: {
        fullName,
        email,
        phone,
        password: hashedPassword,
      },
      transaction: t,
    });

    if (!created) {
      return {
        status: 400,
        success: false,
        message: 'Account already exist',
        data: {}
      };
    }

    const token = await createToken({ id: account.id}, '2d');

    await t.commit();

    account.password = undefined;

    return {
			status: 201,
			success: true,
			message: 'Account created successfully',
			data: account,
			token,
		};
	} catch (error) {
    await t.rollback();
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
