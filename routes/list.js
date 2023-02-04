/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require("express");
const router = express.Router();
// const db = require('../db/connection');

router.get("/", (req, res) => {
  res.render("list");
});

router.get("/add", (req, res) => {
  res.render("add");
});

// router.get('/id', (req, res) => {
//   const templateVars =
//   res.render('add', templateVar)
// })

module.exports = router;
