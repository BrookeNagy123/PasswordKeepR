// Generator Script

//Elements Required from generator.ejs
const includeUppercase = document.getElementById('uppercase');
const includeLowercase = document.getElementById("lowercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");
const passLength = document.getElementById("length");
const passLengthResult = document.getElementById('length-result');
const result = document.getElementById("result");
const generateBtn = document.getElementById("generate");
const copyPass = document.getElementById("copy");

//Upon load of the page set up the first generated password
$(window).load("DOMContentLoaded", () => {
  passLength.value = 10;
  passLengthResult.innerText = "10";
  const onLoadUpper = includeUppercase.value;
  const onLoadLower = includeLowercase.value;
  const onLoadLength = passLength.value;
  const onLoadNumbers = includeNumbers.checked;
  const onLoadSymbols = includeSymbols.checked;
  result.value = generatePassword(onLoadUpper, onLoadLower, onLoadNumbers, onLoadSymbols, onLoadLength);
});

//Watch for an event change of the password length
$(passLength).change("change", (event) => {
  passLengthResult.innerText = event.target.value;
});

//Watch for a click to change options for password generator
$(generateBtn).click("click", () => {
  const upper = includeUppercase.checked;
  const lower = includeLowercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  const length =  passLength.value;
  result.value = generatePassword(upper, lower, numbers, symbols, length);
});

//Function to generate password using the different options
function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";
  let variationsCount = [upper, lower, number, symbol].filter(Boolean).length; //filter out options not set to true
  for (let i = 0; i <= length; i += variationsCount) {
    if (upper) {
      generatedPassword += getRandomUpper();
    }
    if (lower) {
      generatedPassword += getRandomLower();
    }
    if (number) {
      generatedPassword += getRandomNumber();
    }
    if (symbol) {
      generatedPassword += getRandomSymbol();
    }
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

//Functions to get random upper, lower, number, and symbol

function getRandomUpper() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upper[Math.floor(Math.random() * upper.length)];
}

function getRandomLower() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  return lower[Math.floor(Math.random() * lower.length)];
}

function getRandomNumber() {
  const numbers = "123456789";
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//Copy to clipboard for generated password
$(copyPass).click(function(){
  $(result).select();
  document.execCommand('copy');
  alert("Copied on Clipboard");
});
