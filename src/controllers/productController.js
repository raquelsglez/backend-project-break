const Product = require('../models/Product');

const showProducts = async (req, res) => {
    try {
        const dashboard = req.url.includes('/dashboard');
        const { category } = req.query;
        let products;
        if(category){
            products = await Product.find({ category }); 
        } else { 
            products = await Product.find();
        };

        const productCards = getProductCards(products, dashboard);
        const html = baseHtml(productCards, dashboard);
        res.send(html);
    } catch {
        res.status(500).send({message: "There was a problem trying to get the products"});
    };
};

const showProductById = async (req, res) => {
    try {
        const dashboard = req.url.includes('/dashboard');
        const product = await Product.findById(req.params.productId);
        const productInfo = getProductInfo(product, dashboard);
        const html = baseHtml(productInfo, dashboard);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to get a product"});
    }
};

const showNewProduct = (req, res) => {
    const dashboard = req.url.includes('/dashboard');

    const form = getNewProductForm();
    const html = baseHtml(form, dashboard);
    res.send(html);
};

const createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect('/dashboard');
    } catch(error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to create a product"});
    };
};

const showEditProduct = async (req, res) => {
    const dashboard = req.url.includes('/dashboard');

    const product = await Product.findById(req.params.productId);
    const form = getEditedProductFrom(product);
    const html = baseHtml(form, dashboard); 
    res.send(html);
};


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        res.redirect(`/dashboard/${product._id}`);
    } catch(error) {
        console.error(error);
        res.status(500).send({message: "There was a problem trying to update a product"});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: "Product not found" });
        };
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete a product" });
    }
};

const getProductInfo = (product, dashboard) => {
    if (dashboard) {
        return `
            <div class="product-info product-info-dashboard">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoría: ${product.category}</p>
                <p>Talla: ${product.size}</p>
                <form method="POST" action="/dashboard/${product._id}/delete?_method=DELETE">
                    <button type="submit">Borrar</button>
                </form>
                <form method="GET" action="/dashboard/${product._id}/edit">
                    <button type="submit">Editar</button>
                </form>
            </div>
        `;

    } else {
        return `
            <div class="product-info">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoría: ${product.category}</p>
                <p>Talla: ${product.size}</p>
            </div>
        `;
    };
};


const baseHtml = (info, dashboard) => `
  <!DOCTYPE html>
  <html>
    <head>
        <title>ClothesShop</title>
        <link rel="stylesheet" href="/styles.css">
        <link href="https://fonts.cdnfonts.com/css/melton-bronze-timeless" rel="stylesheet">
    </head>
    <body>
        <header>
            ${getNavBar(dashboard)}
        </header>
        <main>
            ${info}
        </main>
    </body>
  </html>
`;


const getNavBar = (dashboard) =>{
    if(dashboard){
        return `
        <nav>
            <a href="/dashboard">Productos</a>
            <a href="/dashboard?category=Camisetas">Camisetas</a>
            <a href="/dashboard?category=Pantalones">Pantalones</a>
            <a href="/dashboard?category=Zapatos">Zapatos</a>
            <a href="/dashboard?category=Accesorios">Accesorios</a>
            <a href="/dashboard/new">Crear producto</a>
            <a href="/auth/logout">Log out</a>
        </nav>
        `
    }else {
        return `
        <nav>
            <a href="/products">Productos</a>
            <a href="/products?category=Camisetas">Camisetas</a>
            <a href="/products?category=Pantalones">Pantalones</a>
            <a href="/products?category=Zapatos">Zapatos</a>
            <a href="/products?category=Accesorios">Accesorios</a>
            <a href="/login">Login</a>
        </nav>
        `
    }
};


function getProductCards(products, dashboard) {
    let html = '';
    for (let product of products) {
        if (dashboard) {
            html += `
                <div class="product-card">
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <a href="/dashboard/${product._id}">Ver</a>
                </div>
            `;
        } else {
            html += `
                <div class="product-card">
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <a href="/products/${product._id}">Ver</a>
                </div>
            `;
        }
    }
    return html;
};


const getNewProductForm = () => `
        <div class="form-create">
            <h1>Crear producto</h1>
            <form action="/dashboard" method="POST">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
                <label for="description">Descripción:</label>
                <textarea id="description" name="description" required></textarea>
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" min="5" max="100" required>
                <label for="image">URL de la imagen:</label>
                <input type="text" id="image" name="image" required>
                <label for="category">Categoría:</label>
                <select id="category" name="category" required>
                    <option value="Camisetas">Camisetas</option>
                    <option value="Pantalones">Pantalones</option>
                    <option value="Zapatos">Zapatos</option>
                    <option value="Accesorios">Accesorios</option>
                </select>
                <label for="size">Talla:</label>
                <select id="size" name="size" required>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <button type="submit">Crear</button>
            </form>
        </div>
`;


const getEditedProductFrom = (product) => `
    <div class="form-edit">
        <h1>Editar producto</h1>
        <form method="POST" action="/dashboard/${product._id}?_method=PUT">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="${product.name}" required>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required>${product.description}</textarea>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" value="${product.price}" min="5" max="100" required>
            <label for="image">URL de la imagen:</label>
            <input type="text" id="image" name="image" value="${product.image}" required>
            <label for="category">Categoría:</label>
            <select id="category" name="category" value="${product.category}" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <label for="size">Talla:</label>
            <select id="size" name="size" value="${product.size}" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button class="edit-button" type="submit">Editar</button>
        </form>
        <form method="GET" action="/dashboard/${product._id}">
            <button type="submit">Cancelar</button>
        </form>
    </div>
`;

const getErrors = async (req, res) => {
    const dashboard = req.url.includes('/dashboard');

    let error = "";

    if (req.query.error == '1'){
        error = `
        <div class="div-error">
            <p class="error">Debes estar logueado</p>
        </div>`
    }

    const html = baseHtml(error, dashboard);
    res.send(html);
};


module.exports = {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
  getProductInfo,
  getNavBar,
  getProductCards,
  getNewProductForm,
  getEditedProductFrom,
  getErrors,
};
