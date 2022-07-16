var express = require('express');
var router = express.Router();
const handler = require('../handlers/pets');

router.get('/', handler.get);
router.get('/:code', handler.getByCode);
router.post('/', handler.create);
router.put('/:code', handler.update);
router.delete('/:code', handler.delete);

module.exports = router;
