const dotenv = require('dotenv');  
dotenv.config();
const express = require('express');
const connecttoDB = require('./db/db');
const userRoutes = require('./routes/user.routes');

connecttoDB();


const app = express();
const cors = require('cors');


app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

module.exports = app;