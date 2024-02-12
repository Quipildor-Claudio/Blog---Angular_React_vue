const express = require('express');
const mongoose = require('mongoose');
const dbURL = require('./config/config');
var article_routes = require('./routes/articleRoute');
const app = express();
var port =dbURL.port;
mongoose.connect(dbURL.dbURL);


app.use('/api',article_routes);


app.listen(port,()=>{
  console.log(`Servidor escuchando en http://localhost:${port}`);
});