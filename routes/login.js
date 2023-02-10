/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login,
 * these routes are mounted onto /login
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const { getUserWithEmail } = require('../db/queries/login');

//Function to check database for email and return user
const login = function (email) {
  return getUserWithEmail(email)
    .then(user => {
      return user;
    });
};

//GET Route
router.get('/', (req, res) => {
  if (req.session.email) {
    res.redirect('/list');
  } else {
    const templateVars = { user: req.session.email ? req.session.email : null };
    res.render('login', templateVars);
  }
});

//POST Route
router.post('/', (req, res) => {
  const email = req.body.email;
  login(email)
    .then(user => {
      if (!user) {
        res.send("🚨Please use valid login details");
        return;
      }
      req.session.email = email;
      res.redirect('list');
    })
    .catch(e => console.log(e));
});

module.exports = router;
