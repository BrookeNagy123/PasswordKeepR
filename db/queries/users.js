const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUsersOrgIdAndVaultId = () => {
  const queryString = `
    SELECT users.organization_id AND vaults.id
    FROM users
    JOIN vaults ON vaults.organization_id = users.organization_id
    WHERE users.id = $1;
    `;

  const values = [

  ]

  return db.query('SELECT users.organization_id AND vaults.id FROM user ;')
}
module.exports = { getUsers };
