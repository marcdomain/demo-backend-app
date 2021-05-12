const bcrypt = require('bcryptjs');
const joi = require('joi');
const db = require('../../models');
const createToken = require('../../helpers/createToken');

const schema = joi.object({
  email: joi.string().trim().email().lowercase().required(),
  password: joi.string().trim().required().max(50).min(4),
});

exports.login = async req => {
	try {
    const validatedParams = await schema.validateAsync(req);
    const { email, password } = validatedParams;

		const authUser = await db.accounts.findOne({ where: { email } });

		if (!authUser) {
			return { success: false, message: 'Incorrect Email or Password', data: {} };
		}

		const match = bcrypt.compareSync(password, authUser.password);

		if (!match) {
			return { success: false, message: 'Incorrect Email or Password', data: {} };
		}

		const token = await createToken({ id: authUser.id }, '2d');

		return {
			status: 200,
			success: true,
			message: 'Login successful',
			data: { email, password },
			token,
		};
	} catch (error) {
		return { status: 500, success: false, message: error.message, data: {} };
	}
};
