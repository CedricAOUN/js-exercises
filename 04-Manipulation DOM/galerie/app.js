

const imgDisp = document.getElementById('imgDisplay');
const imgDesc = document.getElementById('imgDesc');
const thumbnailSection = document.getElementById('thumbnails');

const imagesList = [
  {
    url: 'assets/image1.jpg',
    desc: 'description 1'
  },
  {
    url: 'assets/image2.jpg',
    desc: 'description de l\'image 2'
  },
  {
    url: 'assets/image3.jpg',
    desc: 'wow c\'est 3'
  }
]

imgDesc.textContent = imagesList[0].desc;

for (let i of imagesList) {
  let newImg = document.createElement('img');
  newImg.src = i.url;
  newImg.style = 'height: 100px; width: 100px'
  newImg.onclick = () => changeDisplay(i.url, i.desc);
  thumbnailSection.appendChild(newImg);
}

function changeDisplay(url, desc) {
  imgDisp.src = url;
  imgDesc.textContent = desc;
}