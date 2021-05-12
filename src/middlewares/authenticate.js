require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
	const header = req.headers['authorization'] || req.body.headers?.Authorization;

	if (typeof header !== 'undefined') {
		const [, token] = header.split(' ');

		if (!token) return res.status(403).json({
			success: false,
			message: 'Token not provided',
		});

		jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
			if (err) {
				return res.status(403).json({ success: false, message: 'Invalid Token' });
			} else {
				req.user = decode;
				next();
			}
		});
	} else {
		res.status(403).json({ success: false, message: 'Forbidden Request. Authorization header is undefined' });
	}
};

module.exports = checkToken;
