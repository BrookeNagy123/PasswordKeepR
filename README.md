# PasswordKeepR
=========
## Description

In today's digital age at both home and work, you have more online accounts than you can possibly remember. Since 81% of account breaches are due to weak or reused passwords, it’s essential that each account has a strong, unique password. So how are you supposed to remember these strong, unique passwords? Let PasswordKeepR handle it!

This app allows authorized users access to all their passwords, from both personal and organizations. In a addition, users can generate a new password for their online accounts. Users will be able to generate a password based on the options the form will provide. Easily find, copy and paste your passwords for your favourite websites!

It's that simple! 😉

This project serves as a project to apply full-stack development concepts including HTML/EJS, CSS/SASS, NodeJS, Express, PostgreSQL

## Features

1. user can register/login and be assigned to an organization
2. an organization has multiple users
3. user can add a new username and password for a specific website
4. app can generate passwords based on the criteria specified (password length, contains lowercase, contains uppercase, contains numbers, etc.)
5. user can edit and change their password any time
6. user has a convenient copy to clipboard button so they dont have to select the password
7. sites can be categorized to social (fb, linkedin), work related (bamboo, harvest), entertainment (snapchat, reddit), etc.


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Screenshots

!["Screenshot of Home Page"](https://github.com/BrookeNagy123/PasswordKeepR/blob/master/public/images/1.png?raw=true)

!["Screenshot of List Page"](https://github.com/BrookeNagy123/PasswordKeepR/blob/master/public/images/2.png?raw=true)

!["Screenshot of Generator Page"](https://github.com/BrookeNagy123/PasswordKeepR/blob/master/public/images/3.png?raw=true)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 8.5.0
- SASS 1.35.1
- Express 4.17.1
- EJS 2.6.2
- dotenv 2.0.0
- cookie-session 2.0.0
- chalk 2.4.2
- morgan 1.9.1

## Development Dependencies
- nodemon 2.0.10
