const express = require('express')
const dotenv = require('dotenv');
const app = express();
const { dbConnection } = require('./config/db');
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
//cargar variables de entorno del archivo .env
app.use(methodOverride('_method'));
 //necesario cuando se utiliza formularios HTML para enviar solicitudes PUT y DELETE. 
//Este middleware permite usar métodos HTTP PUT y DELETE en lugares donde normalmente solo se permiten GET y POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); //// Servir archivos estáticos desde la carpeta 'public'

app.use('/', productRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
