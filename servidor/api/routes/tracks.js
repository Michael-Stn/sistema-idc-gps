var express = require('express');
var router = express.Router();
const handler = require('../handlers/tracks');

router.get('/', handler.get);
router.get('/:code', handler.getByPet);
router.post('/', handler.create);

module.exports = router;
