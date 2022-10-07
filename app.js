const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get('/views/beers.hbs', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers[0]);
      res.render('beers', {
        b: beers
      });
    })
    .catch(err => {
      console.log(err);
      res.render('page500');
    });
});
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(responseFromDB => {
      res.render('beers', { beer: responseFromDB });
    })
    .catch(err => {
      console.log(err);
      res.render('page500');
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromRndBeer => {
      res.render('random', { beer: responseFromRndBeer });
    })
    .catch(err => {
      console.log(err);
      res.render('page500');
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
