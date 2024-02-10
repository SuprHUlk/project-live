const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');
const verifyRoutes = require('./routes/verifyRoutes');

const app = express();

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection failed");
    })

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:4200'
    ];
        
    const origin = req.headers.origin;
        
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
        
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
        
    if (req.method === 'OPTIONS') {
        console.log('Received OPTIONS request');
        res.status(200).end();
    } 
    else {
        next();
    }
});
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     res.status(200).json({
//         id: '21321321'
//     });
// })

app.use('/auth', authRoute);
app.use('/verify', verifyRoutes);

module.exports = app;