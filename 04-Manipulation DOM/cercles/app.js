// utilitary functions
function colorGenerator() {
  let randomRed = Math.floor(Math.random() * 256);
  let randomGreen = Math.floor(Math.random() * 256);
  let randomBlue = Math.floor(Math.random() * 256);
  let randomColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
  
  return randomColor
}

function randomSize() {
  let randomSize = Math.floor(50 + Math.random() * 101);
  return randomSize;
}

function toPx(value) {
  return value + 'px';
}

const colors = [];


document.addEventListener('DOMContentLoaded', () => {

  for (let i = 0; i < 10; i++) colors.push(colorGenerator()); // generate 10 colors; 

  document.addEventListener('click', handleClick);

});
 


function handleClick(e) {
  let height = e.pageY;
  let width = e.pageX;

  createDiv(height, width);
  fallAndDelete(getLastDiv());
}

function createDiv(height, width) {
  // variables
  let div = document.createElement('div');
  div.setAttribute('class', 'circle');
  const size = randomSize();

  // style
  div.style.position = 'absolute';
  div.style.borderRadius = '50%';
  div.style.width = toPx(size);
  div.style.height = toPx(size);
  div.style.top = toPx(height - (size / 2));
  div.style.left = toPx(width - (size / 2));
  div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  div.style.transition = 'top 500ms ease-out, opacity 1s';

  document.getElementById('canvas').appendChild(div);
}

function getLastDiv() {
  return document.querySelector('#canvas > div:last-child')
}

function fallAndDelete(div) {

  // initiate fall after 50ms;
  setTimeout(() => {
    div.style.top = toPx(window.innerHeight - parseInt(div.style.height));
  }, 50);

  // make transparent after transitionends
  div.addEventListener('transitionend', () => {
    div.style.opacity = 0;
  });

  // delete
  setTimeout(() => {
    div.remove();
  }, 3000);


}