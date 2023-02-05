/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const { addPassword, getCategories } = require('../db/queries/add');

router.get("/", (req, res) => {
  res.render("list");
});

router.get("/add", (req, res) => {
  const categories = getCategories()
    .then((categories) =>{
      const data = {categories: categories}
      res.render('add', data)
    })
});

router.post("/add", (req, res) => {
  newPass = req.body;
  addPassword(newPass)
    // .then(password => {
    //   res.send(password);
    // })
    // .catch (error => {
    //   console.error(error);
    //   res.send(error);
    // });
  res.redirect("/list");
});

// router.get('/id', (req, res) => {
//   const templateVars =
// })

module.exports = router;
