//window.addEventListener("load", fullNumber);


var rangeNumber = null;
var rangeNumberText = null;

function start(){
  rangeNumber = document.querySelector("#rangeNumber");
  rangeNumberText = document.querySelector("#rangeNumberText");

  var inputRange = document.querySelector("#inputRange");
  inputRange.addEventListener('input', handleRangeChange);
}

//mostra o valor em numeral do input range
function handleRangeChange(event){
  var inputRangeValue = event.target.value;

  rangeNumber.value = inputRangeValue;
  rangeNumberText.value = fullNumber(inputRangeValue);
}

function fullNumber(numberInput){
  console.log('todos os recursos foram carregados!')

  const size = numberInput.toString().length;

  if (size === 1){
    return unity(numberInput);
  }

  
  if (size === 2){
    return ten(numberInput);
  } 
  
  if (size === 3){
    return hundred(numberInput);
  }
}

//função para a unidade
function unity(numberInput){
  if (numberInput === '0') return 'zero';
  if (numberInput === '1') return 'um';
  if (numberInput === '2') return 'dois';
  if (numberInput === '3') return 'três';
  if (numberInput === '4') return 'quatro';
  if (numberInput === '5') return 'cinco';
  if (numberInput === '6') return 'seis';
  if (numberInput === '7') return 'sete';
  if (numberInput === '8') return 'oito';
  if (numberInput === '9') return 'nove';
}

//função para a dezena
function ten(numberInput){
  if (numberInput === '10') return 'dez';
  if (numberInput === '11') return 'onze';
  if (numberInput === '12') return 'doze';
  if (numberInput === '13') return 'treze';
  if (numberInput === '14') return 'quatorze';
  if (numberInput === '15') return 'quinze';
  if (numberInput === '16') return 'dezesseis';
  if (numberInput === '17') return 'dezessete';
  if (numberInput === '18') return 'dezoito';
  if (numberInput === '19') return 'dezenove';
  if (numberInput === '20') return 'vinte';
  if (numberInput === '30') return 'trinta';
  if (numberInput === '40') return 'quarenta';
  if (numberInput === '50') return 'cinquente';
  if (numberInput === '60') return 'sessenta';
  if (numberInput === '70') return 'setenta';
  if (numberInput === '80') return 'oitenta';
  if (numberInput === '90') return 'noventa';

  var firstCharacter = numberInput[0];
  var secondCharacter = numberInput[1];

  var prefix = '';

  if (firstCharacter === '2') prefix = 'vinte e ';
  if (firstCharacter === '3') prefix = 'trinta e ';
  if (firstCharacter === '4') prefix = 'quarenta e ';
  if (firstCharacter === '5') prefix = 'cinquenta e ';
  if (firstCharacter === '6') prefix = 'sessenta e ';
  if (firstCharacter === '7') prefix = 'setenta e ';
  if (firstCharacter === '8') prefix = 'oitenta e ';
  if (firstCharacter === '9') prefix = 'noventa e ';

  return prefix + unity(secondCharacter);
}

//função para a centena
function hundred(numberInput){
  if (numberInput === '100') return 'cem';
  if (numberInput === '200') return 'duzentos';
  if (numberInput === '300') return 'trezentos';
  if (numberInput === '400') return 'quatrocentos';
  if (numberInput === '500') return 'quinhentos';
  if (numberInput === '600') return 'seiscentos';
  if (numberInput === '700') return 'setecentos';
  if (numberInput === '800') return 'oitocentos';
  if (numberInput === '900') return 'novecentos';

  var firstCharacter = numberInput[0];
  var prefix = '';

  if (firstCharacter === '1') prefix = 'cento e ';
  if (firstCharacter === '2') prefix = 'duzentos e ';
  if (firstCharacter === '3') prefix = 'trezentos e ';
  if (firstCharacter === '4') prefix = 'quatrocentos e ';
  if (firstCharacter === '5') prefix = 'quinhentos e ';
  if (firstCharacter === '6') prefix = 'seiscentos e ';
  if (firstCharacter === '7') prefix = 'setecentos e ';
  if (firstCharacter === '8') prefix = 'oitocentos e ';
  if (firstCharacter === '9') prefix = 'novecentos e ';

  var secondCharacter = numberInput[1];
  var thirdCharacter = numberInput[2];
  var secondAndThirdCharacters = numberInput.substring(1);

  if (secondCharacter === '0') {
    return prefix + unity(thirdCharacter);
  }

  return prefix + ten(secondAndThirdCharacters);
}

start();