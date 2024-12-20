const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;


mongoose.connect(MONGO_URI,{
    dbName: DB_NAME
}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('Error connecting to database', err);
})
