// Client facing scripts here

//Elements Required from generator.ejs
const includeUppercase = document.getElementById('uppercase');
const includeLowercase = document.getElementById("lowercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");
const passLength = document.getElementById("length");
const passLengthResult = document.getElementById('length-result')
const result = document.getElementById("result");
const generateBtn = document.getElementById("generate");
const copyPass = document.getElementById("copy");

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


$(passLength).change("change", (event) => {
  passLengthResult.innerText = event.target.value;
});

$(generateBtn).click("click", () => {
  const upper = includeUppercase.checked;
  const lower = includeLowercase.checked;
  const numbers = includeNumbers.checked;
  const symbols = includeSymbols.checked;
  const length =  passLength.value;
  result.value = generatePassword(upper, lower, numbers, symbols, length);
});

function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";
  let variationsCount = [upper, lower, number, symbol].length;
  for (let i = 0; i < length; i += variationsCount) {
    if(upper){
      generatedPassword += getRandomUpper();
    }
    if(lower){
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

function getRandomUpper() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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


$(copyPass).click(function(){
  $(result).select();
  document.execCommand('copy');
  alert("Copied on Clipboard");
});
