const express = require('express')
const app = express();
const { dbConnection } = require('./config/db');
const PORT = process.env.PORT;
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

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

dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
