const db = require('../connection');

const listPasswords = (user) => {
  const queryString = `
  SELECT passwords.name, passwords.url, passwords.username, passwords.password, passwords.id, categories.name AS category
  FROM passwords
  JOIN categories ON categories.id = category_id
  JOIN vaults ON vaults.id = vault_id
  WHERE vault_id = 1;
  `;

  // const values = [user.vault_id];

  return db.query(queryString)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
};

const getPasswordById = (id) => {
  const queryString = `
  SELECT *
  FROM passwords
  WHERE passwords.id = $1;
  `;

  const values = [id];

  return db.query(queryString, values)
  .then(data => {
    return data.rows[0];
  })
  .catch(error => {
    console.log('query error:', error);
  })
}

module.exports = { listPasswords, getPasswordById };
