DROP TABLE IF EXISTS vaults CASCADE;

CREATE TABLE vaults (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);