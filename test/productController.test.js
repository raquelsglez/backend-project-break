const productController = require('../src/controllers/productController');
const Product = require("../src/models/Product"); 

const product = {
    _id: "1",
    name: "name",
    description: "description",
    image: "image",
    category: "Camisetas",
    size: "XS",
    price: 20
}

// beforeEach(() => {
//     Product.deleteMany();
// })


describe('Get product info', () => {
    it('should return product info with dashboard', () => {
        expect(productController.getProductInfo(product, true)).toBe(`
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
        `)
    });

    it('should return product info without dashboard', () => {
        expect(productController.getProductInfo(product, false)).toBe(`
            <div class="product-info">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <p>Categoría: ${product.category}</p>
                <p>Talla: ${product.size}</p>
            </div>
        `)
    });
})

describe('Get nav bar', () => {
    it('should return nav bar with dashboard', () => {
        expect(productController.getNavBar(true)).toBe(`
        <nav>
            <a href="/dashboard">Productos</a>
            <a href="/dashboard?category=Camisetas">Camisetas</a>
            <a href="/dashboard?category=Pantalones">Pantalones</a>
            <a href="/dashboard?category=Zapatos">Zapatos</a>
            <a href="/dashboard?category=Accesorios">Accesorios</a>
            <a href="/dashboard/new">Crear producto</a>
            <a href="/auth/logout">Log out</a>
        </nav>
        `)
    });

    it('should return nav bar without dashboard', () => {
        expect(productController.getNavBar(false)).toBe(`
        <nav>
            <a href="/products">Productos</a>
            <a href="/products?category=Camisetas">Camisetas</a>
            <a href="/products?category=Pantalones">Pantalones</a>
            <a href="/products?category=Zapatos">Zapatos</a>
            <a href="/products?category=Accesorios">Accesorios</a>
            <a href="/login">Login</a>
        </nav>
        `)
      });
})

describe('Get product cards', () => {
    it('should return product cards with dashboard', () => {
        expect(productController.getProductCards([product], true)).toBe(`
                <div class="product-card">
                    <h2>name</h2>
                    <img src="image" alt="name">
                    <a href="/dashboard/1">Ver</a>
                </div>
            `)
    });

    it('should return product cards without dashboard', () => {
        expect(productController.getProductCards([product], false)).toBe(`
                <div class="product-card">
                    <h2>name</h2>
                    <img src="image" alt="name">
                    <a href="/products/1">Ver</a>
                </div>
            `)
    });
})

describe('Get new product form', () => {
    it('should return new product form', () => {
        expect(productController.getNewProductForm()).toBe(`
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
`)
    });
})

describe('Get edited product form', () => {
    it('should return edited product form', () => {
        expect(productController.getEditedProductFrom(product)).toBe(`
    <div class="form-edit">
        <h1>Editar producto</h1>
        <form method="POST" action="/dashboard/1?_method=PUT">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="name" required>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required>description</textarea>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" value="20" min="5" max="100" required>
            <label for="image">URL de la imagen:</label>
            <input type="text" id="image" name="image" value="image" required>
            <label for="category">Categoría:</label>
            <select id="category" name="category" value="Camisetas" required>
                <option value="Camisetas">Camisetas</option>
                <option value="Pantalones">Pantalones</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Accesorios">Accesorios</option>
            </select>
            <label for="size">Talla:</label>
            <select id="size" name="size" value="XS" required>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button class="edit-button" type="submit">Editar</button>
        </form>
        <form method="GET" action="/dashboard/1">
            <button type="submit">Cancelar</button>
        </form>
    </div>
`)
    });
})