// eslint-disable-next-line
window.addEventListener('load', start);

function start() {
  const input = document.getElementById('mainText');

  input.addEventListener('keyup', converte);
}

function converte() {
  const input = document.getElementById('mainText');

  inverted(input.value);
  numeric(input.value.toUpperCase());
  csv(input.value);
  slug(input.value.toLowerCase());
  vowels(input.value);
  consonants(input.value);
  variable(input.value);

}
function stringNormalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


function inverted(textValue) {
  let invertedInput = document.getElementById('inverted');
  
  return invertedInput.value = textValue.split('').reverse().join('');
}

function numeric(textValue) {
  let numericInput = document.getElementById('numeric');
  
  return numericInput.value = stringNormalize(textValue)
    .replace(/['O']/g, '0')
    .replace(/['L']/g, '1')
    .replace(/['E']/g, '3')
    .replace(/['A']/g, '4')
    .replace(/['S']/g, '5')
    .replace(/['T']/g, '7');
}

function csv(textValue) {
  let csv = document.getElementById('csv');
  return textValue === "" ? csv.value = '' : csv.value = `"${textValue.split(' ').join('";"')}"`;
}

function slug(textValue) {
  let slug = document.getElementById('slug');
  return slug.value = textValue.split(' ').join('-');
}

function vowels(textValue) {
  let vowelsInput = document.getElementById('vowels');
  return vowelsInput.value = textValue.replace(/[bcdfghjklmnpqrstvwxyz]/gi, ' ');
}

function consonants(textValue) {
  let consonantsInput = document.getElementById('consonants');
  return consonantsInput.value = textValue.replace(/[aeiou]/gi, ' ');

}

function variable(textValue) {
  let variableInput = document.getElementById('variable');
  
  return variableInput.value = textValue.split(' ').map(function(word,index){
    return index == 0 ? (word.toLowerCase()) : (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }).join('');  
}

export default start;