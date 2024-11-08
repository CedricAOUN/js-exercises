const form = document.querySelector('form');
const inputs = document.querySelectorAll('form input');
const operatorSelector = document.getElementById('operators')
const submitBtn = document.getElementById('submit');
const result = document.getElementById('result');

const showBtn = document.getElementById('show-btn');
const hideBtn = document.getElementById('hide-btn');



function calculate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return '⚠️ You divide by 0 and created a black hole. ⚠️';
      }
      return num1 / num2;
    case '%':
      return num1 % num2;
    default:
      return 'Hey! Don\'t touch the inspector!';
  }

}

document.addEventListener('DOMContentLoaded', () => {
  submitBtn.onclick = (e) => {
    e.preventDefault();
    const num1 = parseFloat(inputs[0].value.replace(',', '.'));
    const num2 = parseFloat(inputs[1].value.replace(',', '.'));
    if (isNaN(num1) || isNaN(num2)) {
      result.textContent = 'Try again...With only numbers this time!';
    } else {
      result.textContent = (`${num1} ${operatorSelector.value} ${num2} = `) + calculate(num1, num2, operatorSelector.value).toFixed(2);
    }
    
  }

  inputs[0].addEventListener('mouseover', () => showInfoLabel(inputs[0]));
  inputs[0].addEventListener('mouseleave', () => hideInfoLabel(inputs[0]));
  inputs[1].addEventListener('mouseover', () => showInfoLabel(inputs[1]));
  inputs[1].addEventListener('mouseleave', () => hideInfoLabel(inputs[1]));

});

function showInfoLabel(element) {
  if (element == inputs[0]) element.setAttribute('placeholder', 'Enter first number of equation');
  else element.setAttribute('placeholder', 'Enter second number of equation');
}

function hideInfoLabel(element) {
  element.setAttribute('placeholder', '');
}



showBtn.onclick = () => {
  form.style.display = 'flex';
  form.style.opacity = 1
};
hideBtn.onclick = () => {
  form.style.opacity = 0
  setTimeout(() => form.style.display = 'none', 700);
};