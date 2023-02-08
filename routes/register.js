const express = require('express');
const router = express.Router();
const { addUser, getOrgWithId } = require('../db/queries/register');
const { getUserWithEmail } = require('../db/queries/login');
const db = require('../db/connection');

const register = function (email) {
  return getUserWithEmail(email)
    .then(user => {
      return user;
    });
}

const registerOrg = function (id) {
  return getOrgWithId(id)
    .then(org => {
      return org;
    });
}

router.get('/', (req, res) => {
  const templateVars = { user: req.session.email ? req.session.email : null }
  res.render('register', templateVars);
});

router.post("/", (req, res) => {
  const email = req.body.email;
  const id = req.body.organization_id
  register(email)
    .then(user => {
      if (user) {
        res.status(400).send('🚨Email is Already Registered!😳');
        return;
      };
      registerOrg(id)
        .then(org => {
          if (!org) {
            res.status(400).send('🚨Organizations does not exist!🧐');
            return;
          };
          newUser = req.body;
          addUser(newUser)
            .then(user => {
              req.session.email = user[0].email;
              res.redirect("/list");
            })
            .catch(error => {
              console.error(error);
              res.send(error);
            });
        });
    });
})

module.exports = router;
