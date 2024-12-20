const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db');
app.use(bodyParser.json());
app.use(cors());
app.use('/users',userRoutes);

const PORT = process.env.PORT || 8001;
app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})