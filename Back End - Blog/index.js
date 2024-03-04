const express = require('express');
const mongoose = require('mongoose');
const dbURL = require('./config/config');
const article_routes = require('./routes/articleRoute');
const app = express();
var port =dbURL.port;
app.use(express.json()); // 

mongoose.connect(dbURL.dbURL);
// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api',article_routes);


app.listen(port,()=>{
  console.log(`Servidor escuchando en http://localhost:${port}`);
});