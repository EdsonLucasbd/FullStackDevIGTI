let tabUsersFound = null;
let tabUsersStatistics = null;
let textInput = null;
let searchButton = null;
let loadAnimation = null;

let allUsers = [];

let totalMaleList = 0;
let totalFemaleList = 0;
let totalAges = 0;
let totalUsersFound = 0;
let averageAge = 0;




window.addEventListener('load', () => {
  tabUsersFound = document.querySelector('#tabUsersFound');
  tabUsersStatistics = document.querySelector('#tabUsersStatistics');
  totalUsersFound = document.querySelector('#totalUsersFound');
  textInput = document.querySelector('#inputSearch');
  searchButton = document.querySelector('#buttonSearch');
  loadAnimation = document.querySelector('#loading');

  getData();
  preventFormSubmit();
  //onButtonClick();
})

async function getData() {
  const response = await fetch('http://localhost:3007/results');
  const users = await response.json();

  allUsers = users.map(person => {
    const { name, picture, dob, gender } = person;

    return {
      name: `${name.first} ${name.last}`,
      picture: picture.medium,
      age: dob.age,
      gender
    };
  }).sort((a, b ) => a.name.localeCompare(b.name));
  render();
}

function activateInput(){
  function handleTyping(event){
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      renderUsersList(search(event.target.value));
      // A função .trim() basicamente impede que um espaço em branco seja enviado
    }
    if (event.target.value.trim() !== '') {
      searchButton.disabled = false;
      searchButton.addEventListener('click', () => renderUsersList(search((event.target.value.trim()))))
    }
    else searchButton.disabled = true;
  }

  textInput.addEventListener('keyup', handleTyping);
}

function render(){
  load();
  activateInput();
  //renderUsersStatistics();
}

function renderUsersList(userObj) {
  const h3 = document.createElement('h3');
  h3.textContent = userObj.length + ' usuário(s) encontrado(s)';

  const ul = document.createElement('ul');

  userObj.map(({ name, picture, age }) => {
    const li = document.createElement('li');
    li.classList.add('flex-row');

    const img = `<img src="${picture}" alt="${name}" title=${name} />`;
    const span = `<span>${name}, ${age} anos</span>`;

    li.innerHTML = `${img} ${span}`;
    ul.appendChild(li);
   });

   tabUsersFound.innerHTML = '';
  tabUsersFound.appendChild(h3);
  tabUsersFound.appendChild(ul);

  renderUsersStatistics(userObj);
}

function renderUsersStatistics(usersObj) {
  const male = usersObj.filter(person => person.gender === 'male').length;
  const female = usersObj.filter(person => person.gender === 'female').length;
  const ages = usersObj.reduce((accumulator, { age }) => accumulator + age, 0);
  const average = (ages / usersObj.length || 0)
    .toFixed(2)
    .replace('.', ',');
    //A função .toFixed(2) serve basicamente para definir que o número seja exibido com 2 casas decimais.
  
  tabUsersStatistics.innerHTML = `
    <h3>Estatísticas</h3>
      <ul>
        <li>Sexo masculino: ${male}</li>
        <li>Sexo feminino: ${female}</li>
        <li>Soma das idades: ${ages}</li>
        <li>Média das idades: ${average}</li>
      </ul>
  `;
}

function preventFormSubmit(){
  function handleFormSubmit(event) {
	event.preventDefault();
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function search(query){
  return allUsers.filter(person => person.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
}


function load(){
  // remove a div da animação após 1s
  setTimeout(() => {
    if (loadAnimation.parentNode) {
      loadAnimation.parentNode.removeChild(loadAnimation);
    }
    textInput.disabled = false;
    textInput.focus();

    //loadAnimation.classList.add('hidden');
  }, 1000);
  
}

/* function onButtonClick() {
  searchButton.addEventListener('click', () => search(textInput.value));
}; */