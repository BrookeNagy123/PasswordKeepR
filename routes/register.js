const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const { getUserWithEmail } = require('../db/queries/register');

const register =  function(email) {
  return getUserWithEmail(email)
  .then(user => {
      return user;
  });
}

router.get('/', (req, res) => {
  res.render('register');
});

/*router.get("/", (req, res) => {
  if (req.session.user_id) {
    res.redirect("/list");
  } else {
    templateVars = { current_user: currentUser(req.session.user_id, users) }
    res.render("urls_register", templateVars);
  }
}) */

router.post('/register', (req, res) => {
  const email = req.body.email;
  register(email)
    .then(user => {
      if (!user) {
        res.send("Please use valid register details");
        return;
      }
      req.session.email = email
      res.redirect("/list")
    })
    .catch(e => console.log(e));
});

module.exports = router;
