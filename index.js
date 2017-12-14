const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index', {js: ''});
});

app.get('/progressive', (req, res) => {
  res.render('progressive', {js: 'progressive.js'});
});

app.get('/responsive-progressive', (req, res) => {
  res.render('responsive-progressive', {js: 'responsive-progressive.js'});
});

app.get('/decode-promise', (req, res) => {
  res.render('decode-promise', {js: 'decode-promise.js'});
});

app.get('/image-effect', (req, res) => {
  res.render('image-effect', {js: 'image-effect.js'});
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
})