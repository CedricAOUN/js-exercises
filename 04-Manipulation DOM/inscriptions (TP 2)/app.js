const allInputs = document.querySelectorAll('form input, form textarea');
const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < allInputs.length; i++) {
    switch (allInputs[i].id) {
      case 'username':
        allInputs[i].addEventListener('blur', (e) => { checkCharacterAmount(e, 4, 14) });
        break;
      case 'password-confirm':
        allInputs[i].addEventListener('blur', checkPassword);
        break;
      case 'postal':
        allInputs[i].addEventListener('blur', (e) => { checkNumberAmount(e, 5)});
        break;
      case 'telephone':
        allInputs[i].addEventListener('blur', (e) => { checkNumberAmount(e, 10)});
        break;
      default:
        allInputs[i].addEventListener('blur', checkIfEmpty);
    }
  }

  form.addEventListener('submit', handleSubmit);
});




function checkIfEmpty(e) {
  const element = e.target || e;

  if (!element.value) {
    showError(element, 'Required!');
    return false;
  } 
  else {
    hideError(element);
    return true;
  }
}

function checkCharacterAmount(e, lowerLimit, upperLimit) {
  const element = e.target || e;
  const length = element.value.length;

  if (length > upperLimit || length < lowerLimit) {
    showError(element, `Between ${lowerLimit} and ${upperLimit} characters allowed`);
    return false;
  } else {
    hideError(element);
    return true;
  }
}

function checkPassword(e) {
  const firstPassword = document.getElementById('password');
  const secondPassword = e.target || e;

  if (firstPassword.value != secondPassword.value) {
    showError(firstPassword, 'Passwords do not match!');
    showError(secondPassword, 'Passwords do not match!');
    firstPassword.value = '';
    secondPassword.value = '';
    return false;
  } else {
    checkIfEmpty(e);
    return true;
  }
}

function checkNumberAmount(e, limit) {
  const element = e.target || e;
  const notANumberRegex = /\D/g;

  const cleanValue = element.value.replaceAll(notANumberRegex, ''); 
  const cleanValueLength = cleanValue.length;
  const valueIsNan = isNaN(cleanValue) || cleanValue === ''

  if(valueIsNan || cleanValueLength != limit) {
    showError(element, `Needs to be exactly ${limit} numbers`);
    return false;
  }
  else {
    element.value = cleanValue;
    hideError(element);
    return true;
  }
}

function showError(element, msg) {
  const errorOfElement = document.getElementById(`${element.id}-error`);

  element.style.border = '1px solid red';

  errorOfElement.textContent = msg;
  errorOfElement.style.display = 'block';
  
}

function hideError(element) {
  const errorOfElement = document.getElementById(`${element.id}-error`);

  element.style.border = 'none';

  errorOfElement.style.display = 'none';
}


function handleSubmit(e) {
  e.preventDefault();
  let isFormValid = true;

  for (let i = 0; i < allInputs.length; i++) {
    switch (allInputs[i].id) {
      case 'username':
        if (!checkCharacterAmount(allInputs[i], 4, 14)) isFormValid = false;
        break;
      case 'password-confirm':
        if (!checkPassword(allInputs[i])) isFormValid = false;
        break;
      case 'postal':
        if (!checkNumberAmount(allInputs[i], 5)) isFormValid = false;
        break;
      case 'telephone':
        if (!checkNumberAmount(allInputs[i], 10)) isFormValid = false;
        break;
      default:
        if (!checkIfEmpty(allInputs[i])) isFormValid = false;
    }
  }

  if (isFormValid) {
    alert('Account Created!');
    for (let e of allInputs) e.value = '';
  } else {
    alert('Something went wrong! Please make sure you filled in all the fields correctly.')
  }
  
}