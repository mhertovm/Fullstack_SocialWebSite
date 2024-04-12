var express = require('express');
var router = express.Router();
const publicController = require('../controllers/public')

/* GET public listing. */
router.get('/verify', publicController.verify);

/* POST public listing. */
router.post('/register', publicController.register);
router.post('/login', publicController.login);

module.exports = router;