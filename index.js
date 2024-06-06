const express = require('express')
const dotenv = require('dotenv');
const app = express();
const { dbConnection } = require('./src/config/db');
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const productRoutes = require('./src/routes/productRoutes');
//const path = require('path');

dotenv.config();
app.use(methodOverride('_method'));
 //necesario cuando se utiliza formularios HTML para enviar solicitudes PUT y DELETE. 
//Este middleware permite usar métodos HTTP PUT y DELETE en lugares donde normalmente solo se permiten GET y POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', productRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
