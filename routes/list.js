/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const { addPassword, getCategories, editPassword, deletePassword } = require('../db/queries/add');
const { listPasswords, getPasswordById, getVaultIdByOrgId } = require("../db/queries/list");
const { getUserWithEmail } = require("../db/queries/login");

router.get("/", (req, res) => {
  if (req.session.email) {
    const userEmail = req.session.email;
    const userInfo = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
      .then(vaultId => listPasswords(vaultId))
      .then(passwordList => {
        const templateVars = {passwords: passwordList}
        res.render("list", templateVars);
      })
    } else {
      res.redirect("/");
    }
});

router.get("/pass_:id", (req, res) => {
  if (req.session.email) {
    const passId = req.params.id;
    const passInfoById = getPasswordById(passId)
    const categories = getCategories()
    Promise.all([passInfoById, categories])
      .then((data) => {
        const templateVars = {id: data[0].id, password_name: data[0].name, vault_id: data[0].vault_id, url: data[0].url, username_email: data[0].username, password: data[0].password, category_id: data[0].category_id, categories: data[1]};
        res.render("edit", templateVars);
      });
  } else {
    res.redirect("/");
  }
});

router.post("/pass_:id", (req, res) => {
  if (req.session.email) {
  editPassword(req.body)
    .then((data) => {
      res.redirect("/list")
    })
  } else {
    res.redirect("/");
  }
});

router.get("/add", (req, res) => {
  if (req.session.email) {
    const categories = getCategories()
      .then((categories) => {
        const templateVars = {categories: categories}
        res.render('add', templateVars)
      });
  } else {
    res.redirect("/");
  }
});

router.post("/add", (req, res) => {
  if (req.session.email) {
    newPass = req.body;
    addPassword(newPass)
      .then(password => {
        res.redirect("/list");
      })
      .catch (error => {
        console.error(error);
        res.send(error);
      });
  } else {
    res.redirect("/");
  }
});

router.post("/pass_:id/delete", (req, res) => {
  if (req.session.email) {
    const passId = req.params.id;
    const deletePass = deletePassword(passId);
    Promise.all([passId, deletePass])
      .then((data) => {
        res.redirect('/list');
      });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
