const express = require('express');
const app = express();
const { dbConnection } = require('./config/db');
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');
const apiProductRoutes = require('./routes/apiProducts');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', productRoutes);
app.use('/', authRoutes);
app.use('/api/products', apiProductRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
