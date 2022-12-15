const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 0 - register as GET
app.get('/hello', routes.hello)

// Route 1 - register as GET
app.get('/movie', routes.movie)

// Route 2 - register as GET
app.get('/country', routes.get_all_from_country)

// Route 3 - register as GET
app.get('/mostpopular', routes.most_popular_movies)

// Route 4 - register as GET
app.get('/filters', routes.filters)

// Route 5 - register as GET
app.get('/nummoviesbycountry', routes.num_movies_by_country)

// Route 6 - register as GET
// app.get('/player', routes.player)
app.get('/populargenre/:country', routes.popular_genre_by_country)





app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
