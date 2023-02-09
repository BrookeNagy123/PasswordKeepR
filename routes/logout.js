const express = require('express');
const router = express.Router();
// Route for logout submission
router.post("/", (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
