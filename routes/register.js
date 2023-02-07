const express = require('express');
const router = express.Router();
const { addUser } = require('../db/queries/register');
const db = require('../db/connection');

router.get('/', (req, res) => {
  const templateVars = {user: req.session.email ? req.session.email : null}
  res.render('register', templateVars);
});

router.post("/", (req, res) => {
  newUser = req.body;
  addUser(newUser)
    .then(user => {
      req.session.email = user[0].email;
      res.redirect("/list");
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

module.exports = router;
