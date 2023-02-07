const db = require('../connection');

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

module.exports = { addUser };
