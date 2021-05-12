const router = require('express').Router();
const { register, login } = require('../../services/accounts');
const { handleResponse } = require('../../helpers/responseHandler');
const { logger } = require('../../helpers/logger');

router.post('/register', async (req, res) => {
  const data = await register(req.body);
  handleResponse(data, res, req.method, req.originalUrl);
});

router.post('/login', async (req, res) => {
  const data = await login(req.body);
	handleResponse(data, res, req.method, req.originalUrl);
});

module.exports = router;
