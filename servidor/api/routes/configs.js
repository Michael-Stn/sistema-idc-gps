var express = require('express');
var router = express.Router();
const handler = require('../handlers/configs');

router.get('/', handler.get);
router.post('/', handler.create);
router.put('/', handler.update);
module.exports = router;
