const baseHtml = (info) => `
  <!DOCTYPE html>
  <html>
    <head>
        <title>ClothesShop</title>
        <link rel="stylesheet" href="/styles.css">
        <link href="https://fonts.cdnfonts.com/css/melton-bronze-timeless" rel="stylesheet">
    </head>
    <body>
        <header>
            ${getNavBar}
        </header>
        <main>
            ${info}
        </main>
    </body>
  </html>
`;

const getNavBar = () =>{
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
};


const getLoginForm = (req, res) => {

    let error = "";
    if (req.query.error){
            error = "Usuario o contraseña incorrectos"
    }

    const html = `
    <div class="form-login">
        <form method="POST" action="/auth/login">
            <h1>Log In</h1>
            <input type="email" id="email" name="email" placeholder="youremail@gmail.com">
            <input type="password" id="pwd" name="pwd" placeholder="contraseña">
            <button type="submit">Iniciar sesión</button>
        </form>
        <form method="GET" action="/register">
            <button type="submit">Registrarse</button>
        </form>
        <p class="error">${error}</p>
    </div>
    `
    res.send(baseHtml(html))
}


const getRegisterForm = (req, res) => {

    let error = "";
    if (req.query.error){
            error = "Ha ocurrido un error, por favor inténtelo de nuevo"
    }

    let confirmation = "";
    if (req.query.confirmation){
            confirmation = "Se ha registrado correctamente"
    } 


    const html = `
    <form class="form-register" method="POST" action="/auth/register">
        <h1>Registro</h1>
        <label for="name">Enter your name:</label>
        <input type="text" id="name" name="name" placeholder="Hugo">
        <label for="surnames">Enter your surnames:</label>
        <input type="text" id="surnames" name="surnames" placeholder="Márquez Hernández">
        <label for="email">Enter your email:</label>
        <input type="email" id="email" name="email" placeholder="youremail@gmail.com">
        <label for="pwd">Enter your password:</label>
        <input type="password" id="pwd" name="pwd" placeholder="contraseña">
        <button type="submit">Registrarse</button>
        <p class="error">${error}</p>
        <p>${confirmation}</p>
    </form>
    `
    res.send(baseHtml(html))
}

module.exports = {
    getLoginForm,
    getRegisterForm,
};
  