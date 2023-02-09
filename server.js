// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


// Separated Routes for each resource

const passwordList = require('./routes/list');
const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const generator = require('./routes/generator');

// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/list', passwordList);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/generator', generator);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = { user: req.session.email ? req.session.email : null }
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
