const Product = require('../models/Product');

const showProducts = async (req, res, next) => {
    try {
        const { category } = req.query;
        let products;
        if(category){
            products = await Product.find({ category }); 
        } else { 
            products = await Product.find();
        };

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to get products"});
    };
};

const showProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to get a product"});
    }
};

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to create a product" });
    };
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.json(product)
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to update a product"});
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        };
        res.json(deleteProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "There was a problem trying to delete a product" });
    }
};

module.exports = { 
    showProducts,
    showProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
