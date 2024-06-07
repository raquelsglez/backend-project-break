const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	category: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], required: true },
	size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true },
	price: { type: Number, required: true }
}, { timestamps: true });//agrega campos de createdAt y updatedAt

const Product = mongoose.model('product', productSchema);

module.exports = Product;
