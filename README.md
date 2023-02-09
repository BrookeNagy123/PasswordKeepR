PasswordKeepR
=========
A storage system for passwords for organzations. An organization, like Lighthouse labs, has many different accounts which need to be shared between users. This app will let an authorized user acess all the passwords of the organization. The app will also let a user generate a new password for a specific account (just like LastPass). Users will be able to generate a password based on the options the form will provide. Some of the options are: password length, contains lowercase, contairs uppercase, contains numbers, and contains symbols.

If a user needs to log in to a specific website (e.g. Facebook) they can go into the app, find the appropriate password, click a button which copies the password into the clipboard, and log in.

## Requirements

1. user can register/login and be assigned to an organization
2. an organization has many users
3. user can add a new username and password for a specific website
4. app can generate passwords based on the criteria specified (password length, contains lowercase contairs uppercase, contains numbers, etc)
5. user can edit and change their password any time
6. user has a convinient copy to clipboard button so they dont have to select the password
7. sites can be categoried, to, social (fb, linkedin), work related (bamboo, harvest), entertainment (snapchat, reddit), etc, etc

## Project Setup

The following steps are only for _one_ of the group members to perform.

1. Create your own copy of this repo using the `Use This Template` button, ideally using the name of your project. The repo should be marked Public
2. Verify that the skeleton code now shows up in your repo on GitHub, you should be automatically redirected
3. Clone your copy of the repo to your dev machine
4. Add your team members as collaborators to the project so that they can push to this repo
5. Let your team members know the repo URL so that they use the same repo (they should _not_ create a copy/fork of this repo since that will add additional workflow complexity to the project)


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


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
