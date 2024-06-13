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

/*

//GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle
router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      let productsLinks = '';
      products.forEach(product => {
        productsLinks += `
            <li>
                <a href="/products/${product._id}">${product.name}</a>
            </li>
        `;
      });
      res.status(200).send(`
        <h1>Products</h1>
        <ul>
          ${productsLinks}
        </ul>
        <a href="/dashboard">Admin Dashboard</a>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to get the products"});
    }
});

// GET /products/:productId: Devuelve el detalle de un producto
router.get('/products/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).send(`
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <img src="${product.image}" alt="${product.name}">
        <p>Category: ${product.category}</p>
        <p>Size: ${product.size}</p>
        <p>Price: $${product.price}</p>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to get the product"});
    }
});

//GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo
router.get('/dashboard', async (req, res) => {
    try {
      const products = await Product.find();
      let productsLinks = '';
      products.forEach(product => {
        productsLinks += `
            <li>
                <a href="/dashboard/${product._id}">${product.name}</a>
            </li>
        `;
      });
      res.status(200).send(`
        <h1>Products</h1>
        <ul>
          ${productsLinks}
        </ul>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to get the products"});
    }
});

//GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo

//POST /dashboard: Crea un nuevo producto
router.post('/dashboard', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a product" });
    };
});


//GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard
router.get('/dashboard/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).send(`
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <img src="${product.image}" alt="${product.name}">
        <p>Category: ${product.category}</p>
        <p>Size: ${product.size}</p>
        <p>Price: $${product.price}</p>
        <a href="/dashboard/${product._id}/edit">Editar</a>
        <a href="/dashboard/${product._id}/delete">Eliminar</a>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to get the product"});
    }
});

//GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto

//PUT /dashboard/:productId: Actualiza un producto
router.put("/dashboard/:productId", async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true })
        res.status(200).send({ message: "product successfully updated", product });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update a product" });
    }
});

//DELETE /dashboard/:productId/delete: Elimina un producto
router.delete("/dashboard/:productId/delete", async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.status(200).send({ message: "product deleted", product });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete a product" });
    }
});

module.exports = router; 

*/
