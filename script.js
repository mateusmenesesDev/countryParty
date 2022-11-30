function darkMode() {
  document.querySelector('body').classList.toggle('dark-mode-background');
  document.querySelector('header').classList.toggle('dark-mode-elements');
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

async function getCountries() {
  const request = await fetch("https://restcountries.com/v3.1/all");
  const countries = await request.json();
  const cardName = document.querySelector('.card.sample');
  countries.forEach((country) => {
    const newCard = cardName.cloneNode(true);
    newCard.classList.remove('sample');
    newCard.querySelector('img').src = country.flags.png;
    newCard.querySelector('h3').innerHTML = country.name.common;
    const dataP = newCard.querySelectorAll('span');
    dataP[0].innerHTML = `Population: ${country.population}`;
    dataP[1].innerHTML = `Region: ${country.region}`;
    dataP[2].innerHTML = `Capital: ${country.capital}`;
    const cardContainer = document.querySelector('#card-container');
    cardContainer.appendChild(newCard);
  });
}

async function filterCountries() {
  const region = document.querySelector('.dropdown button').innerHTML;
  console.log(region);
  const cardName = document.querySelector('.card.sample');
  console.log(cardName);
  const countriesToRemove = document.querySelectorAll('#card-container .card');
  countriesToRemove.forEach((element) => {
    element.remove();
  });
  if (region === 'All continents') {
    getCountries();
    return;
  }
  const request = await fetch(`https://restcountries.com/v3.1/region/${region}`)
  const countries = await request.json();
  countries.forEach((country) => {
    const newCard = cardName.cloneNode(true);
    newCard.classList.remove('sample');
    newCard.querySelector('img').src = country.flags.png;
    newCard.querySelector('h3').innerHTML = country.name.common;
    const dataP = newCard.querySelectorAll('span');
    dataP[0].innerHTML = `Population: ${country.population}`;
    dataP[1].innerHTML = `Region: ${country.region}`;
    dataP[2].innerHTML = `Capital: ${country.capital}`;
    const cardContainer = document.querySelector('#card-container');
    cardContainer.appendChild(newCard);
  });
}

window.onload = () => {
  const darkModeContainer = document.querySelector('#dark-mode-container');
  darkModeContainer.addEventListener('click', darkMode);
  changeTextDropdown();
  getCountries();
};