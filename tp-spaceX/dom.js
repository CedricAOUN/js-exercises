// ELEMENTS
const humanStatElement = document.querySelector('#humans p');
const vehiclesStatElement = document.querySelector('#vehicles p');
const planetStatElement = document.querySelector('#planets p');
const nextDateElement = document.querySelector('#next-date p');
const planetListElement = document.querySelector('#planetList ul');
const planetResultsElement = document.querySelector('#planetResults');
const planetDetails = document.querySelector('#planetDetails');
const selectField = document.querySelector('#selectField');
const searchField = document.querySelector('#searchField');
const searchBtn = document.querySelector('#searchBtn');

// STATIC FUTURE DATE
const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 1);
currentDate.setFullYear(currentDate.getFullYear() + 1);
if (nextDateElement) nextDateElement.textContent = currentDate.toDateString();

// GLOBAL VARIABLES
let planets;
let people;
let vehicles;

// For more performance, check current route before fetching info
const currentRoute = window.location.pathname;

// INIT
async function init() {
  if (currentRoute == '/tp-spaceX/index.html') { 
    people = await fetchData('https://swapi.dev/api/people');
    vehicles = await fetchData('https://swapi.dev/api/starships');
    planets = await fetchData('https://swapi.dev/api/planets');
  }

  if(currentRoute == '/tp-spaceX/planets.html') planets = await fetchAllResults('https://swapi.dev/api/planets');

  removeLoaders();
  displayStats();
  planetListRender(planets);
};

init();

// display stats on index.html
function displayStats() {
  // only displayStats if on index.html
  if (humanStatElement && vehiclesStatElement && planetStatElement) { 
    humanStatElement.textContent = people.count;
    vehiclesStatElement.textContent = vehicles.count;
    planetStatElement.textContent = planets.count;
  }
}

// remove loaders if they exist on the page
function removeLoaders() {
  const loaders = document.querySelectorAll('.loader');
  if (loaders.length > 0) {
    for (let l of loaders) {
      l.remove();
    }
  }
}

// filter planets according to the selectField and searchField
const filterPlanets = (allPlanets) => {
  const filteredPlanets = allPlanets.filter((planet) => {
    if (selectField.value) {
      switch (selectField.value) {
        case '100000':
          if (planet.population < parseInt(selectField.value)) return planet;
          break;
        case '100000-100000000':
          if (planet.population > 100000 && planet.population < 100000000) return planet;
          break;
        case '100000000':
          if (planet.population > 100000000) return planet;
          break;
      }
    } else {
      return planet;
    }
  });

  let searchedPlanets = filteredPlanets; // if searchField empty just return searchedPlanets
  if (searchField.value != '') {
    searchedPlanets = filteredPlanets.filter((planet) => planet.name.toLowerCase().includes(searchField.value.toLowerCase()));
    console.log(searchedPlanets);
  }
  planetResultsElement.textContent = `${searchedPlanets.length} resultat(s)`;
  return searchedPlanets;
}

// reset and re-render the list of planets available after filtering
const planetListRender = (allPlanets) => {
  const planets = filterPlanets(allPlanets);
  planetListElement.innerHTML = '';

  for (const [index, p] of planets.entries()) {
    const li = document.createElement('li');
    li.id = `planet-${index}`;
    li.className = 'd-flex justify-content-between align-items-center m-3 border-bottom border-1';

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = p.name;

    const terrainParagraph = document.createElement('p');
    terrainParagraph.className = 'small-text';
    terrainParagraph.textContent = p.terrain;

    li.appendChild(nameParagraph);
    li.appendChild(terrainParagraph);
    li.addEventListener('click', () => displayDetailedInfo(p.name))

    planetListElement.appendChild(li);
  }
}

// display detailed info on the right when a planet is clicked
async function displayDetailedInfo(name) {
  const planet = planets.find((planet) => planet.name == name);
  planetDetails.innerHTML = '';

  const mainTitle = `<h1>${planet.name}</h1>`
  const population = `<p class='mb-5'><span class='detail-title'>Population: </span>${planet.population}</p>`;

  let cardDisplay = document.createElement('div');
  cardDisplay.className = 'card-display';
  const diameterCard = infoCard('fa-regular fa-circle detail-title', 'Diameter', planet.diameter);
  const climateCard = infoCard('fa-solid fa-temperature-three-quarters detail-title', 'Climat', planet.climate);
  const gravityCard = infoCard('fa-solid fa-magnet detail-title', 'Gravite', planet.gravity);
  const terrainCard = infoCard('fa-solid fa-tree detail-title', 'Terrain', planet.terrain);
  cardDisplay.innerHTML += diameterCard + climateCard + gravityCard + terrainCard;

  planetDetails.innerHTML += mainTitle + population;
  planetDetails.appendChild(cardDisplay);
}

// information card template
function infoCard(iconClass, title, value) {
  let card = `
  <div id='card' class='d-flex gap-2'>
    <i class='${iconClass}'></i>
    <div class='mx-2'>
      <p class='detail-title'>${title}</p>
      <p>${value}</p>
    </div>
  </div>
  `
  return card;
}


// listeners
selectField.addEventListener('change', handleChange);
searchBtn.addEventListener('click', handleChange);

function handleChange() {
  planetListRender(planets);
}