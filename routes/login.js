const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getUserWithEmail } = require('../db/queries/login');

const login =  function(email) {
  return getUserWithEmail(email)
  .then(user => {
      return user;
  });
}

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const email = req.body.email;
  login(email)
    .then(user => {
      if (!user) {
        res.send("Please use valid login details");
        return;
      }
      const userID = user.id
      const userEmail = user.email
      const userOrganization = user.organization_id
      const templateVars = {userID, userEmail, userOrganization}
      console.log(templateVars)
      req.session.email = email
      res.redirect("/list")
    })
    .catch(e => console.log(e));
});

module.exports = router;
