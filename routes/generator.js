/*
 * All routes for Password Generator are defined here
 * Since this file is loaded in server.js into /generator,
 * these routes are mounted onto /generator
 */

const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');

const includeUppercase = document.querySelector("#uppercase");
const includeLowercase = document.querySelector("#lowercase");
const includeNumbers = document.querySelector("#numbers");
const includeSymbols = document.querySelector("#symbols");
const passLength = document.querySelector("#length");
const password = document.getElementById("password");
const generateBtn = document.querySelector("#generate");
const copyPass = document.querySelector("#copy");

generateBtn.addEventListener("click", () => {
  const upper = includeUppercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  const length = passLength.value;
  result.value = generatePassword(numbers, symbols, length);
});

function generate(){
  // const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // const passwordLength = 6;
  // const password = "";
  // for (var i = 0; i <= passwordLength; i++) {
  //   var randomNumber = Math.floor(Math.random() * chars.length);
  //   password += chars.substring(randomNumber, randomNumber +1);
  //  }
  //        document.getElementById("password").value = password;
  }


function copy(){
  copyPass.select();
  navigator.clipboard.writeText(copyPass.value);
  alert("Copied the text")
}

router.get('/generator', (req, res) => {
  res.render('generator')
});




module.exports = router;
