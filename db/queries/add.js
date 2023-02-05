const db = require('../connection');

const addPassword = (newPass) => {
  const queryString = `
  INSERT INTO passwords (name, vault_id, url, username, password, category_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;

  const values = []
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

router.get('/', (req, res) => {
  const query = `SELECT * FROM widgets`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = { getUsers };
