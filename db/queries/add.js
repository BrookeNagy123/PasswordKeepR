const db = require('../connection');

const addPassword = (newPass, id) => {
  const queryString = `
    INSERT INTO passwords (name, vault_id, url, username, password, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

  const values = [newPass['password-name'], id, newPass.url, newPass.username, newPass.password, newPass.category_id]
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

const editPassword = (newPass, id) => {
  const queryString = `
    UPDATE passwords
    SET name = $1,
    vault_id = $2,
    url = $3,
    username = $4,
    password = $5,
    category_id = $6
    WHERE id = $7
    RETURNING *;
    `;

  const values = [newPass['password-name'], id, newPass.url, newPass.username, newPass.password, newPass.category_id, newPass.id];
  return db.query(queryString, values)
    .then(data => {
      return data.rows;
    })
    .catch(error => {
      console.log('query error:', error);
    })
};

const deletePassword = (passId) => {
  const queryString = `
    DELETE FROM passwords
    WHERE id = $1;
  `;

  const values = [passId];
  return db.query(queryString, values)
  .then(data => {
    return data.rows;
  })
  .catch(error => {
    console.log('query error:', error);
  })
}



module.exports = { addPassword, getCategories, editPassword, deletePassword };
