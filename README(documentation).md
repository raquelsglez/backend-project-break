# Backend Project-Break

Este es un proyecto de una **aplicación web** de tienda de ropa. Un usuario **normal** puede **acceder** a los productos, mientras que un usuario **admin** puede **gestionar** (Obtener, Crear, Editar y Borrar) dichos productos.

## Tecnologías usadas

### Backend: Node.js + Express
**Node.js** es un entorno de ejecución para JavaScript, mientras que **Express** es un framework para Node.js que simplifica el desarrollo de aplicaciones web y APIs.

### Visualización: HTML + CSS
**HTML** es el lenguaje estándar para crear páginas web. Su función principal es estructurar el contenido en la web mediante el uso de etiquetas, a su vez **CSS** es el lenguaje utilizado para describir la presentación de un documento escrito en HTML. Permite a los desarrolladores aplicar estilos a los elementos HTML, controlando el diseño visual y la disposición de la página web.

- ¿Como devolvemos html y css desde la parte del servidor?
 
    - **HTML:** Por la parte de html es sencillo podemos devolverlo en la respuesta con un **template** tal que así:
        ```javascript
        res.send(
            `<div class="product-card">
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <a href="/products/${product._id}">Ver</a>
            </div>`
        )
        ```
    - **CSS:** Para esto hemos necesitado usar un **middleware** de express:
        ```javascript
        app.use(express.static('public'))
        ```
        Donde **public** es la carpeta donde estará nuestro archivo **styles.css**.

- Dato a tener en cuenta:    
Tenemos que saber que no podemos hacer llamadas **PUT** y **DELETE** directamente desde el HTML. Para poder realizar estas acciones hemos utilizado la libreria ``method-override``:

    1. 
        ```javascript
        app.use(methodOverride('_method'));
        ```

    2.
        ```html
        <form method="POST" action="/dashboard/1/delete?_method=DELETE">
            <button type="submit">Borrar</button>
        </form>
        ```

### Base de datos: Mongo
MongoDB es una base de datos NoSQL. A diferencia de las bases de datos relacionales tradicionales que utilizan tablas y filas, MongoDB almacena datos en documentos flexibles similares a JSON, que permiten una estructura más dinámica y fácil de modificar.

Para poder usar MongoDB en nuestro proyecto hemos usado la libreria ``mongoose``.


### Variables de entorno: .env
El archivo .env es un archivo de configuración utilizado en aplicaciones para almacenar variables de entorno. Estas variables se utilizan para configurar la aplicación.

Para poder obtener las varibles de entorno desde el .env hemos usado la libreria ``dotenv``.



## Funcionamiento

### Primeros pasos
Para arrancar el proyecto necesitaremos ejecutar los siguientes comandos

1. Instalar dependencias:
    ```
    npm install
    ```

2. Encender el servidor:
    ```
    npm start
    ```

### Modelo
Hemos creado la estructura de un modelo de **producto** con los siguientes datos:

```javascript
new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String },
	category: { type: String, enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'], required: true },
	size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true },
	price: { type: Number, required: true }
}, { timestamps: true });
```

### Rutas
- Usuario no autenticado.
    - GET / - Pagina de inicio para cuando arranque el servidor (Listado de productos).
    - GET /products - Listado de productos.
    - GET /products/{id} - Detalle del producto.

- Usuario autenticado admin.
    - GET /dashboard - Listado de productos.
    - GET /dashboard/{id} - Detalle del producto, donde puede acceder a borrarlo o editarlo.
    - GET /dashboard/new - Formulario para crear un producto.
    - POST /dashboard - Ruta para crear un producto.
    - GET /dashboard/{id}/edit - Formulario para editar un producto.
    - PUT /dashboard/{id} - Ruta para editar un producto.
    - DELETE /dashboard/{id}/delete - Ruta para borrar un producto.

### Controladores
#### Principales
- showProducts: Devuelve la página con todos los productos.
- showProductById: Devuelve la página con la información de un producto.
- showNewProduct: Devuelve la página con un formulario para crear un producto nuevo.
- createProduct: Crea un nuevo producto, posteriormente, redirige a la página del dashboard.
- showEditProduct: Devuelve la página con un formulario para editar un producto.
- updateProduct: Edita un producto, posteriormente, redirige a la página del detalle del producto.
- deleteProduct: Elimina un producto, posteriormente, redirige a la página del dashboard.

#### Auxiliares
- getProductInfo: Devuelve el html del detalle del produto diferenciando entre la vista del dashboard y la normal.
- baseHtml: Devuelve un html base, para todas las vistas, ya que contiene el header y las referrencias al css.
- getNavBar: Devuelve el nav del header, diferenciando entre la vista del dashboard y la normal.
- getProductCards: Devuelve el html del listado de produtos diferenciando entre la vista del dashboard y la normal.
- getNewProductForm: Devuelve el formulario para crear un producto.
- getEditedProductFrom: Devuelve el formulario para editar un producto.

### Visualización

 
