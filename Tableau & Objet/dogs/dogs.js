
// EXO 1

let dogs = ['Akita Inu', 'Bouvier bernois', 'Beagle'];
let countries = ['Japan', 'Switzerland', 'England', 'Mexico', 'England'];

dogs.push('Chihuahua');
dogs.push('Bulldog');


const sortAndMakeObjectList = () => {
  let sortedDogs = dogs.sort();

  let objectList = [];
  for (let i = 0; i < sortedDogs.length; i++) {
    objectList.push({ name: sortedDogs[i] });
  }

  return objectList;
}

const addNativeCountry = (list) => {
  for (let i = 0; i < list.length; i++) {
    list[i].nativeCountry = countries[i];
  }
  return list;
}

console.log(addNativeCountry(sortAndMakeObjectList()));


// EXO 2
let user = {
  firstName: 'Cedric',
  lastName: 'Aoun',
  age: 28,
  fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  isMajor() {
    return this.age >= 18;
  }
};

console.log(user.firstName, user.lastName, user.age, user.fullName(), 'is major?', user.isMajor());

// EXO 3
const entrepreneurs = [
  { first: 'Steve', last: 'Jobs', year: 1955 },
  { first: 'Oprah', last: 'Winfrey', year: 1954 },
  { first: 'Bill', last: 'Gates', year: 1955 },
  { first: 'Sheryl', last: 'Sandberg', year: 1969 },
  { first: 'Mark', last: 'Zuckerberg', year: 1984 },
  { first: 'Beyonce', last: 'Knowles', year: 1981 },
  { first: 'Jeff', last: 'Bezos', year: 1964 },
  { first: 'Diane', last: 'Hendricks', year: 1947 },
  { first: 'Elon', last: 'Musk', year: 1971 },
  { first: 'Marissa', last: 'Mayer', year: 1975 },
  { first: 'Walt', last: 'Disney', year: 1901 },
  { first: 'Larry', last: 'Page', year: 1973 },
  { first: 'Jack', last: 'Dorsey', year: 1976 },
  { first: 'Evan', last: 'Spiegel', year: 1990 },
  { first: 'Brian', last: 'Chesky', year: 1981 },
  { first: 'Travis', last: 'Kalanick', year: 1976 },
  { first: 'Marc', last: 'Andreessen', year: 1971 },
  { first: 'Peter', last: 'Thiel', year: 1967 }
];

const bornIn70s = () => {
  let bornIn70sList = [];
  for (let e of entrepreneurs) {
    if (e.year >= 1970 && e.year < 1980) bornIn70sList.push(e);
  }
  return bornIn70sList;
};

const namesOnly = () => {
  let namesList = [];
  for (let e of entrepreneurs) {
    namesList.push(e.first + ' ', e.last);
  }
  return namesList;
}

const allAges = () => {
  let agesList = [];
  for (let e of entrepreneurs) {
    agesList.push(2024 - e.year);
  }
  return agesList;
}

console.log(bornIn70s());
console.log(namesOnly());
console.log(allAges());

// EXO 4

const books = [
  { title: 'Gatsby le magnifique', id: 133712, rented: 39 },
  { title: 'A la recherche du temps,perdu', id: 237634, rented: 28 },
  { title: 'Orgueil & Préjugés', id: 873495, rented: 67 },
  { title: 'Les frères Karamazov', id: 450911, rented: 55 },
  { title: 'Dans les forêts de Sibérie', id: 8376365, rented: 15 },
  { title: 'Pourquoi j\'ai mangé mon père', id: 450911, rented: 45 },
  { title: 'Et on tuera tous les affreux', id: 67565, rented: 36 },
  { title: 'Le meilleur des mondes', id: 88847, rented: 58 },
  { title: 'La disparition', id: 364445, rented: 33 },
  { title: 'La lune seule le sait', id: 63541, rented: 43 },
  { title: 'Voyage au centre de la Terre', id: 4656388, rented: 38 },
  { title: 'Guerre et Paix', id: 748147, rented: 19 }
];

const allRentedAtleastOnce = () => {
  for (let b in books) {
    if (b.rented == 0) return false;
  }
  return true;
}

const mostRentedBook = () => {
  let rentedAmount = 0;
  let mostRentedBook = null;

  for (let b of books) {
    if (b.rented > rentedAmount) {
      rentedAmount = b.rented;
      mostRentedBook = b;
    };
  }
  return books.find((b) => b.rented == rentedAmount);
}

const leastRentedBook = () => {
  let rentedAmount = Infinity;
  let leastRentedBook = null;

  for (let b of books) {
    if (b.rented < rentedAmount) {
      rentedAmount = b.rented;
      leastRentedBook = b;
    };
  }

  return leastRentedBook;
}

const getBookById = (id) => {
  return books.find((b) => b.id == id);
}

const deteleBookById = (id) => {
  const bookToDelete = books.find((b) => b.id == id);
  books.pop(bookToDelete);
}

console.log('All rented atleast once? ' + allRentedAtleastOnce());
console.log('Most rented book: ');
console.log(mostRentedBook());
console.log('Least rented book: ');
console.log(leastRentedBook());

console.log('Book by ID = 873495: ');
console.log(getBookById(873495));

console.log('Before deleting ID = 133712: ');
console.log(books);
deteleBookById(133712);
console.log('After deleting ID = 133712: ');
console.log(books);


const mainImg = document.querySelector('#imageGen');
const button = document.querySelector('button');
const selectField = document.querySelector('select');
const savedPhotoContainer = document.querySelector('#savedPhotos');
const saveInfo = document.querySelector('#saveInfo');
const savedPhotoURLs = [];


fetch('https://dog.ceo/api/breeds/list/all')
  .then((response) => response.json())
  .then((response) => {
    for (let o of Object.keys(response.message)) {
      const newOption = document.createElement('option');
      newOption.value = o;
      newOption.textContent = o[0].toUpperCase() + o.slice(1);
      selectField.appendChild(newOption);
    }
  }
  );

const getDogByBreed = (breed) => {
  const randomURL = 'https://dog.ceo/api/breeds/image/random';
  const breedURL = `https://dog.ceo/api/breed/${breed}/images/random`;

  fetch(breed ? breedURL : randomURL).then((response) => response.json())
    .then((response) => {
      const newURL = response.message;
      imageGen.src = newURL;
    });
};

button.addEventListener('click',  () => {
  getDogByBreed(selectField.value);
  saveInfo.classList.remove('d-none');
});

mainImg.addEventListener('click', () => {
  const isSavedPhoto = savedPhotoURLs.includes(mainImg.src);
  if (mainImg.src && !isSavedPhoto) {
    const newImg = document.createElement('img');
    newImg.src = mainImg.src;
    newImg.addEventListener('click', () => {
      const index = savedPhotoURLs.indexOf(newImg.src);
      if (index > -1) {
        savedPhotoURLs.splice(index, 1);
      }
      newImg.remove();
    });
    savedPhotoContainer.appendChild(newImg);
    savedPhotoURLs.push(mainImg.src);
  }
});



