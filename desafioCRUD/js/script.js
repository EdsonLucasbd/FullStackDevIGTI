window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');
  
  preventFormSubmit();
  activateInput();
  render();
});

let globalNames = ['um', 'dois', 'três', 'quatro'];
let inputName = null;
let currentIndex = null;
let isEditing = false;

function preventFormSubmit(){
  function handleFormSubmit(event){
    event.preventDefault();
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
  function insertName(newName) {
    globalNames = [...globalNames, newName];
  }

  function updateName(newName){
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event){
    if (event.target.value.trim() === ''){
      clearInput();
      return;
    }

    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
      insertName(event.target.value);
    }

      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render(){
  function createDeleteButton(index){
    function deleteName(){
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }

    const button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);

    return button;
  }
  function createSpan(name, index){
    function editItem(){
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    const span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  const divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  const ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++){
    const currentName = globalNames[i];

    const li = document.createElement('li');
    const button = createDeleteButton(i);
    const span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput(){
  inputName.value = '';
  inputName.focus();
}