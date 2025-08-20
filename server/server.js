const express = require('express');
const db = require('./models/db');
const cors = require('cors');
const allRoutes = require('./routes/allRoutes');
require ('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); //Parse JSON body
app.use(express.urlencoded({extended: true})); // For form data

app.use('/api/students', allRoutes);


const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});