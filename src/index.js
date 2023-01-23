import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

const countriesList = countries => {
  const markup = countries
    .map(country => {
      return (
        '<li><svg width="30" height="20"><image href="' +
        country.flags.svg +
        '" width="30" height="20"/><p>' +
        country.name.official +
        '</p></li>'
      );
    })
    .join('');
  countryList.innerHTML = markup;
};

const oneCountryList = countries => {
  const markup = countries
    .map(country => {
      return (
        '<li><svg width="30" height="20"><image href="' +
        country.flags.svg +
        '" width="30" height="20"/><p>' +
        country.name.official +
        '</p></li><li><p>Capital: ' +
        country.capital +
        '</p></li><li><p>Population: ' +
        country.population +
        '</p></li><li><p>Languages: ' +
        Object.values(country.languages).join(', ') +
        '</p></li>'
      );
    })
    .join('');
  countryList.innerHTML = markup;
};

searchBox.addEventListener(
  'input',
  debounce(() => {
    if (searchBox.value.trim()) {
      fetchCountries(searchBox.value)
        .then(countries => {
          if (countries.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (countries.length >= 2 && countries.length <= 10) {
            countriesList(countries);
          } else {
            oneCountryList(countries);
          }
        })
        .catch(error => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
    } else {
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);
