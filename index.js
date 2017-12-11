const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/progressive', (req, res) => {
  res.render('progressive', {js: 'progressive.js'});
});

app.get('/responsive-progressive', (req, res) => {
  res.render('responsive-progressive', {js: 'responsive-progressive.js'});
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
})