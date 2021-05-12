const { logger } = require('./logger');

exports.handleResponse = (data, res, method, endpoint) => {
	switch (data.status) {
		case 201:
			logger.info(`${method} ${endpoint} [${data.message}]`);
			return res.status(201).json(data);
		case 200:
			logger.info(`${method} ${endpoint} [${data.message}]`);
			return res.status(200).json(data);
		case 400 || 404:
			logger.warn(`${method} ${endpoint} [${data.message}]`);
			return res.status(400).json(data);
		case 500:
			logger.error(`${method} ${endpoint} [${data.message}]`);
			return res.status(500).json(data);
		default:
			logger.error(`${method} ${endpoint} [${data.message}]`);
			return res.status(500).json(data);
	}
};
