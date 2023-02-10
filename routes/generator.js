/*
 * All routes for Password Generator are defined here
 * Since this file is loaded in server.js into /generator,
 * these routes are mounted onto /generator
 */

const express = require('express');
const router  = express.Router();

//GET Route 
router.get('/', (req, res) => {
  if (req.session.email) {
    const templateVars = {user: req.session.email ? req.session.email : null};
    res.render('generator', templateVars);
  } else {
    res.redirect('/')
  }

});

module.exports = router;
