/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into api/list,
 * these routes are mounted onto /api/list
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/list', (req, res) => {
  res.render('list')
});

module.exports = router;
