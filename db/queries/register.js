const db = require('../connection');
//Select organization information by id
const getOrgWithId = function (id) {
  return db.query(`SELECT * FROM users WHERE organization_id = $1`, [id])
    .then((result) => {
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
//Add new user into database
const addUser = (newUser) => {
  const queryString = `
    INSERT INTO users (email, master_password, organization_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;

  const values = [newUser.email, newUser.master_password, newUser.organization_id]
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
};

module.exports = { addUser, getOrgWithId };
