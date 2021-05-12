const router = require('express').Router();
const { create, fetch, deleteRide, update } = require('../../services/rides');
const { handleResponse } = require('../../helpers/responseHandler');
const authenticate = require('../../middlewares/authenticate');

router.post('/', authenticate, async (req, res) => {
  req.body.accountId = req.user.id;

  const data = await create(req.body);
	handleResponse(data, res, req.method, req.originalUrl);
});

router.get('/', authenticate, async (req, res) => {
  req.query.rideId = req.query.rideId && Number(req.query.rideId);
  req.query.accountId = req.user.id

  const data = await fetch(req.query);
	handleResponse(data, res, req.method, req.originalUrl);
});

router.delete('/:id', authenticate, async (req, res) => {
  const payload = {
    rideId: req.params.id,
    accountId: req.user.id,
  }

  const data = await deleteRide(payload);
	handleResponse(data, res, req.method, req.originalUrl);
});

router.put('/:id', authenticate, async (req, res) => {
  req.body.rideId = req.params.id;
  req.body.accountId = req.user.id;

  const data = await update(req.body);
	handleResponse(data, res, req.method, req.originalUrl);
});

module.exports = router;
