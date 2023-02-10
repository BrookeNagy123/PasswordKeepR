const express = require('express');
const router = express.Router();
const { addUser, getOrgWithId } = require('../db/queries/register');
const { getUserWithEmail } = require('../db/queries/login');
const db = require('../db/connection');
//Function to check database for email and return user
const register = function (email) {
  return getUserWithEmail(email)
    .then(user => {
      return user;
    });
}
//Function to check database for id and return organization
const registerOrg = function (id) {
  return getOrgWithId(id)
    .then(org => {
      return org;
    });
}
// Route for register screen
router.get('/', (req, res) => {
  if (req.session.email) {
    res.redirect('list');
  } else {
    const templateVars = { user: req.session.email ? req.session.email : null }
    res.render('register', templateVars);
  }
});
// Route for register submission
router.post("/", (req, res) => {
  const email = req.body.email;
  const id = req.body.organization_id;
  register(email)
    .then(user => {
      if (user) {
        res.status(400).send('🚨Email is Already Registered!😳');
        return;
      };
      registerOrg(id)
        .then(org => {
          if (!org) {
            res.status(400).send('🚨Organization does not exist!🧐');
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
