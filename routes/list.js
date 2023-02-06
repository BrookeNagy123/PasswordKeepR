/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const { addPassword, getCategories } = require('../db/queries/add');
const { listPasswords } = require("../db/queries/list");

router.get("/", (req, res) => {
  const passwordList = listPasswords()
    .then((passwordList) => {
      console.log(passwordList)
      const templateVars = {passwords: passwordList}
      res.render("list", templateVars);
    })

});

router.get("/add", (req, res) => {
  const categories = getCategories()
    .then((categories) => {
      const templateVars = {categories: categories}
      res.render('add', templateVars)
    })
});

router.post("/add", (req, res) => {
  newPass = req.body;
  addPassword(newPass)
    .then(password => {
      res.redirect("/list");
    })
    .catch (error => {
      console.error(error);
      res.send(error);
    });
});

// router.get('/id', (req, res) => {
//   const templateVars =
// })

module.exports = router;
