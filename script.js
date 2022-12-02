function darkMode() {
  document.querySelector('body').classList.toggle('dark-mode-background');
  const elements = document.querySelectorAll('.elements');
  for (const element of elements) {
    element.classList.toggle('dark-mode-elements');
  }
}

function changeTextDropdown() {
  const btn = document.querySelector('.dropdown button');
  const lis = document.querySelectorAll('.dropdown-item');
  for (let i = 0; i < lis.length; i += 1) {
    lis[i].addEventListener('click', (event) => {
      btn.innerHTML = event.target.innerHTML;
      filterCountries();
    });
  }
}

// Delete all cards if necessary from #card-container
function deleteAllCardsInContainer() {
  const countriesToRemove = document.querySelectorAll('#card-container .card');
  countriesToRemove.forEach((element) => {
    element.remove();
  });
}

// Add information to cards from API data and append them to #card-container
function addCardToPage(country, cardTemplate) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.classList.remove('sample');
  newCard.querySelector('img').src = country.flags.png;
  newCard.querySelector('h3').innerHTML = country.name.common;
  const dataP = newCard.querySelectorAll('span');
  dataP[0].innerHTML += country.population;
  dataP[1].innerHTML += country.region;
  dataP[2].innerHTML += country.capital;
  const cardContainer = document.querySelector('#card-container');
  cardContainer.appendChild(newCard);
}

function removePlaceholders() {
  const placeholders = document.querySelectorAll('#card-container .card.placeholder');
  placeholders.forEach((element) => element.remove());
}

function addPlaceholders() {
  const placeholder = document.querySelector('#sample-elements .card.placeholder');
  const cardContainer = document.querySelector('#card-container');
  for (let i = 0; i < 8; i += 1) {
    const newCard = placeholder.cloneNode(true)
    cardContainer.appendChild(newCard);
  }
}

// Gets all countries and add them to the cards
async function getCountries() {
  const request = await fetch("https://restcountries.com/v3.1/all");
  const countriesUnsorted = await request.json();
  const countries = countriesUnsorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
  const cardTemplate = document.querySelector('.card.sample');
  removePlaceholders();
  countries.forEach((country) => {
    addCardToPage(country, cardTemplate);
  });
}

// Filter countries based on dropdown menu for Regions
async function filterCountries() {
  const region = document.querySelector('.dropdown button').innerHTML;
  const cardTemplate = document.querySelector('.card.sample');
  // Delete all cards inside #card-container
  deleteAllCardsInContainer();
  if (region === 'All continents') {
    getCountries();
    return;
  }
  addPlaceholders();
  const request = await fetch(`https://restcountries.com/v3.1/region/${region}`)
  const countriesUnsorted = await request.json();
  const countries = countriesUnsorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
  removePlaceholders();
  countries.forEach((country) => {
    addCardToPage(country, cardTemplate);
  });
}

window.onload = () => {
  const darkModeContainer = document.querySelector('#dark-mode-container');
  darkModeContainer.addEventListener('click', darkMode);
  changeTextDropdown();
  getCountries();
};
