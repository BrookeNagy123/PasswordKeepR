const db = require('../connection');

//list existing passwords from db by session user's vault
const listPasswords = (id) => {
  const queryString = `
  SELECT passwords.name, passwords.url, passwords.username, passwords.password, passwords.id, categories.name AS category
  FROM passwords
  JOIN categories ON categories.id = category_id
  JOIN vaults ON vaults.id = vault_id
  WHERE vault_id = $1;
  `;

  const values = [id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    });
};

//select password information by id
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
    });
};

//select vault id information organization id
const getVaultIdByOrgId = (id) => {
  const queryString = `
  SELECT id AS vault_id
  FROM vaults
  WHERE organization_id = $1;
  `;

  const values = [id];

  return db.query(queryString, values)
    .then(data => {
      return data.rows[0].vault_id;
    })
    .catch(error => {
      console.log('query error:', error);
    });
};

module.exports = { listPasswords, getPasswordById, getVaultIdByOrgId };
