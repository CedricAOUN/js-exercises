const sounds = [
  {
    path: 'sounds/sounds_crash.mp3',
    img: 'imgs/crash.jpg',
    key: 'q',
  },
  {
    path: 'sounds/sounds_snare.mp3',
    img: 'imgs/tom.jpg',
    key: 'w',
  },
  {
    path: 'sounds/sounds_tom-1.mp3',
    img: 'imgs/tom.jpg',
    key: 'e',
  },
  {
    path: 'sounds/sounds_tom-2.mp3',
    img: 'imgs/tom.jpg',
    key: 'r',
  },
  {
    path: 'sounds/sounds_tom-3.mp3',
    img: 'imgs/tom.jpg',
    key: 't',
  },
  {
    path: 'sounds/sounds_tom-4.mp3',
    img: 'imgs/tom.jpg',
    key: 'y',
  },
  {
    path: 'sounds/sounds_kick-bass.mp3',
    img: 'imgs/kick.jpg',
    key: 'c',
  },
]

const drumKitElement = document.getElementById('drumKit');

document.addEventListener('DOMContentLoaded', () => { 

  for (let s of sounds) {
    createButton(s.path, s.img, s.key, drumKitElement);
  }

  document.body.addEventListener('keydown', handleKeyDown);
});






// FUNCTIONS
function createButton(path, img, key, parent) {
  let newButton = document.createElement('button');
  newButton.setAttribute('id', key);
  newButton.setAttribute('class', 'keys');
  newButton.style.backgroundImage = 'url(' + img + ')';
  newButton.style.backgroundSize = 'cover';
  newButton.style.backgroundPosition = 'center';
  newButton.style.padding = '50px';

  newButton.textContent = key.toUpperCase();

  newButton.onclick = () => {
    playSound(path, key);
  };

  parent.appendChild(newButton);
}

function playSound(path, key) {
  let newSnd = new Audio(path);

  // remove border
  let allKeys = document.getElementsByClassName('keys');
  for (let button of allKeys) {
    button.style.border = 'none';
  }
  
  //add border on currently playing button
  document.getElementById(key).style.border = '4px solid red';

  newSnd.play();
}

function handleKeyDown(e) {
  if (e) e.preventDefault();
  
  for (let s of sounds) {
    if (e.key == s.key) {
      playSound(s.path, s.key);
    }
  }
}