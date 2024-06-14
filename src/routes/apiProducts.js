const express = require("express");
const router = express.Router();
const apiProductController = require('../controllers/apiProductController');

router.get('/', apiProductController.showProducts);
router.get('/:productId', apiProductController.showProductById);
router.post('/', apiProductController.createProduct);
router.put('/:productId', apiProductController.updateProduct);
router.delete('/:productId', apiProductController.deleteProduct);

module.exports = router;
