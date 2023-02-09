/*
 * All routes for Password Generator are defined here
 * Since this file is loaded in server.js into /generator,
 * these routes are mounted onto /generator
 */

const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');


router.get('/generator', (req, res) => {
  res.render('generator')
});

module.exports = router;
