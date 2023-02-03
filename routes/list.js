/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');

router.get('/', (req, res) => {
  res.render('list')
});

module.exports = router;
