const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController');
const middleware = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorsMiddleware');

router.get('/', productController.showProducts, errorMiddleware.errorMiddleware);
router.get('/products', productController.showProducts, errorMiddleware.errorMiddleware);
router.get('/products/:productId', productController.showProductById, errorMiddleware.errorMiddleware);
router.get('/dashboard', middleware.verificarSesionMiddleware, productController.showProducts, errorMiddleware.errorMiddleware);
router.get('/dashboard/new', middleware.verificarSesionMiddleware, productController.showNewProduct);
router.post('/dashboard', middleware.verificarSesionMiddleware,productController.createProduct, errorMiddleware.errorMiddleware);
router.get('/dashboard/:productId', middleware.verificarSesionMiddleware, productController.showProductById, errorMiddleware.errorMiddleware);
router.get('/dashboard/:productId/edit', middleware.verificarSesionMiddleware, productController.showEditProduct);
router.put('/dashboard/:productId', middleware.verificarSesionMiddleware, productController.updateProduct, errorMiddleware.errorMiddleware);
router.delete('/dashboard/:productId/delete', middleware.verificarSesionMiddleware, productController.deleteProduct, errorMiddleware.errorMiddleware);
router.get('/errors', productController.getErrors);

module.exports = router;
