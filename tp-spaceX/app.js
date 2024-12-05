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


// API
fetch('https://swapi.dev/api/people').then((res) => res.json())
  .then((res) => {
    const loader = document.querySelector('#humans .loader');
    if (loader) loader.classList = 'd-none loader';
    if (humanStatElement) humanStatElement.textContent = res.count;
  });

fetch('https://swapi.dev/api/starships').then((res) => res.json())
  .then((res) => {
    const loader = document.querySelector('#vehicles .loader');
    if (loader) loader.classList = 'd-none loader';
    if (vehiclesStatElement) vehiclesStatElement.textContent = res.count;
  });

const fetchAllPlanets = async (url) => {
  let allPlanets = [];
  let count = 0;

  async function fetchPage(url) {
    const response = await fetch(url);
    const data = await response.json();
    count = data.count;

    allPlanets = [...allPlanets, ...data.results];

    if (data.next) {
      await fetchPage(data.next); 
    }
  }

  await fetchPage(url);

  return { allPlanets, count };
}

fetchAllPlanets('https://swapi.dev/api/planets').then((res) => {
  const loader = document.querySelector('#planets .loader, #planetList .loader');
  if (loader) loader.classList = 'd-none loader';
  if (planetStatElement) planetStatElement.textContent = res.count;
  if (planetListElement) planetListRender(res.allPlanets);
  if (planetResultsElement) planetResultsElement.textContent = `${res.count} resultat(s)`;
})

// filter planets according to the selectField
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

  let searchedPlanets = filteredPlanets;
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
  const planet = await fetchSinglePlanet(name);
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

// fetch a single planet by its name
async function fetchSinglePlanet(planetName) {
  const url = `https://swapi.dev/api/planets/?search=${planetName}`;
  const planet = await fetch(url).then(res => res.json())
    .then((res) => {
      return res.results[0];
    })
  return planet;
}

// listeners
selectField.addEventListener('change', handleChange);
searchBtn.addEventListener('click', handleChange);

function handleChange() {
  console.log('change');
  fetchAllPlanets('https://swapi.dev/api/planets').then((res) => {
    planetListRender(res.allPlanets)
  });
}