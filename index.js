const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { dbConnection } = require('./src/config/db');
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});