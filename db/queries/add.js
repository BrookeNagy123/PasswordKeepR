const db = require('../connection');

const addPassword = (newPass) => {
  const queryString = `
  INSERT INTO passwords (name, vault_id, url, username, password, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

  const values = [newPass['password-name'], 1, newPass.url, newPass.username, newPass.password, newPass.category_id]
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
};

const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
}




module.exports = { addPassword, getCategories };
