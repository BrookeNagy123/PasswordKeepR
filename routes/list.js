/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const { addPassword } = require('../db/queries/add');

router.get("/", (req, res) => {
  res.render("list");
});

router.get("/add", (req, res) => {
  res.render("add");
});

router.post("/add", (req, res) => {
  newPass = req.body;
  console.log(newPass)
  addPassword(newPass)
    // .then(password => {
    //   res.send(password);
    // })
    // .catch (error => {
    //   console.error(error);
    //   res.send(error);
    // });
    res.render("list");
});

// router.get('/id', (req, res) => {
//   const templateVars =
// })

module.exports = router;
