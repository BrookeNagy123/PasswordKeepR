const db = require('../connection');

const getUserWithEmail = function(email) {
  console.log(email)
  return db.query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      console.log(result)
      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getUserWithEmail }
