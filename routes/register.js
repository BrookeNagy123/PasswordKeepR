const express = require('express');
const router = express.Router();
const { addUser } = require('../db/queries/register');
const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('register');
});

router.post("/", (req, res) => {
  newUser = req.body;
  addUser(newUser)
    .then(user => {
      res.redirect("/list");
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

module.exports = router;
