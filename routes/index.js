const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const AplicationsController = require('../controllers/AplicationsController');
const Server = require('../server');

router.get('/', PagesController.home);

router.post('/log', AplicationsController.login);

module.exports = router;
