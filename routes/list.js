/*
 * All routes for Password List are defined here
 * Since this file is loaded in server.js into /list,
 * these routes are mounted onto /list and /add
 */

const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const { addPassword, getCategories, editPassword, deletePassword } = require('../db/queries/add');
const { listPasswords, getPasswordById, getVaultIdByOrgId } = require("../db/queries/list");
const { getUserWithEmail } = require("../db/queries/login");

// route for list screen
router.get("/", (req, res) => {
  if (req.session.email) {
    const userEmail = req.session.email;
    const userInfo = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      })
      .then(vaultId => listPasswords(vaultId))
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      })
      .then(passwordList => {
        const templateVars = {passwords: passwordList, user: req.session.email ? req.session.email : null}
        res.render("list", templateVars);
      })
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
    } else {
      res.redirect("/");
    }
});

// route for edit screen
router.get("/pass_:id", (req, res) => {
  if (req.session.email) {
    const userEmail = req.session.email;
    const passId = req.params.id;
    const userVaultId = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
    const passInfoById = getPasswordById(passId)
    const categories = getCategories()
    Promise.all([passInfoById, categories, userVaultId])
      .then(data => {
        if (data[0].vault_id === data[2]) {
          const templateVars = {id: data[0].id, password_name: data[0].name, vault_id: data[0].vault_id, url: data[0].url, username_email: data[0].username, password: data[0].password, category_id: data[0].category_id, categories: data[1], user: req.session.email ? req.session.email : null};
          res.render("edit", templateVars);
        } else {
          res.statusCode = 401;
          res.send("<h1>401 Unauthorized!</h1> <h3>You do not have access to this Password.</h3>")
        }
      })
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
  } else {
    res.redirect("/");
  }
});

// route for edit screen submission
router.post("/pass_:id", (req, res) => {
  if (req.session.email) {
    const userEmail = req.session.email;
    const passId = req.params.id;
    const userVaultId = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
    const passInfoById = getPasswordById(passId)
    Promise.all([passInfoById, userVaultId])
      .then(data => {
        const vaultId = data[1];
        if (data[0].vault_id === data[1]) {
          editPassword(req.body, vaultId)
          .then((data) => {
            res.redirect("/list")
          });
        } else {
          res.statusCode = 401;
          res.send("<h1>401 Unauthorized!</h1> <h3>You do not have access to this Password.</h3>")
        }
    })
    .catch(error => {
      console.log(error);
      res.statusCode = 500;
      res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
    });
  } else {
    res.redirect("/");
  }
});

// route for add screen
router.get("/add", (req, res) => {
  if (req.session.email) {
    const categories = getCategories()
      .then((categories) => {
        const templateVars = {categories: categories, user: req.session.email ? req.session.email : null}
        res.render('add', templateVars)
      })
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
  } else {
    res.redirect("/");
  }
});

// route for add screen submission
router.post("/add", (req, res) => {
  if (req.session.email) {
    const newPass = req.body;
    const userEmail = req.session.email;
    const userVaultId = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      })
      .then(vaultId => {
        addPassword(newPass, vaultId)
        .then(() => {
          res.redirect("/list");
        });
      })
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      });
  } else {
    res.redirect("/");
  }
});

// route for delete
router.post("/pass_:id/delete", (req, res) => {
  if (req.session.email) {
    const passId = req.params.id;
    const userEmail = req.session.email;
    const passInfoById = getPasswordById(passId)
    const userVaultId = getUserWithEmail(userEmail)
      .then(userInfo => getVaultIdByOrgId(userInfo.organization_id))
    Promise.all([userVaultId, passInfoById])
      .then(data => {
        if (data[0] === data[1].vault_id) {
          const deletePass = deletePassword(passId)
            .then(() => res.redirect('/list'))
        } else {
          res.statusCode = 401;
          res.send("<h1>401 Unauthorized!</h1> <h3>You do not have access to this Password.</h3>")
        }
      })
      .catch(error => {
        console.log(error);
        res.statusCode = 500;
        res.send("<h1>500 Internal Server Error!</h1> <h3>An error occurred.</h3>")
      })
  } else {
    res.redirect("/");
  }
});

module.exports = router;
