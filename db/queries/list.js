const db = require('../connection');

const listPasswords = (user) => {
  const queryString = `
  SELECT passwords.name, passwords.url, passwords.username, passwords.password, categories.name
  FROM passwords
  JOIN categories ON categories.id = category_id
  JOIN vaults ON vaults.id = vault_id
  WHERE vault_id = $1;
  `;

  const values = [user.vault_id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
};

module.exports = { listPasswords };
