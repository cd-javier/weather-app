import './styles.css';
import getWeather from './getWeather';
import getCity from './getCity';
import weatherIcons from './icons';

const Selector = (function () {
  return {
    form: document.querySelector('form'),
    currentBtn: document.getElementById('current-location'),
    location: document.getElementById('location'),
    currentIcon: document.getElementById('current-icon'),
    currentTemp: document.getElementById('current-temp'),
    currentConditions: document.getElementById('current-conditions'),
    currentFeelsLike: document.getElementById('current-feels-like'),
    days: {
      0: {
        icon: document.getElementById('0-icon'),
        temp: document.getElementById('0-temp'),
        conditions: document.getElementById('0-conditions'),
      },
      1: {
        icon: document.getElementById('1-icon'),
        temp: document.getElementById('1-temp'),
        conditions: document.getElementById('1-conditions'),
      },
      2: {
        day: document.getElementById('2-day'),
        icon: document.getElementById('2-icon'),
        temp: document.getElementById('2-temp'),
        conditions: document.getElementById('2-conditions'),
      },
      3: {
        day: document.getElementById('3-day'),
        icon: document.getElementById('3-icon'),
        temp: document.getElementById('3-temp'),
        conditions: document.getElementById('3-conditions'),
      },
    },
  };
})();

function renderWeather(obj) {
  Selector.location.textContent = `${obj.location}, ${obj.country}`;
  Selector.currentIcon.src = weatherIcons[obj.currentConditions.icon];
  Selector.currentTemp.textContent = `${obj.currentConditions.temp}º`;
  Selector.currentConditions.textContent = obj.currentConditions.conditions;
  Selector.currentFeelsLike.textContent = `Feels like ${obj.currentConditions.feelsLike}º`;

  Selector.days[0].icon.src = weatherIcons[obj.days[0].icon];
  Selector.days[0].temp.textContent = `${obj.days[0].tempMin}º | ${obj.days[0].tempMax}º`;
  Selector.days[0].conditions.textContent = obj.days[0].conditions;

  Selector.days[1].icon.src = weatherIcons[obj.days[1].icon];
  Selector.days[1].temp.textContent = `${obj.days[1].tempMin}º | ${obj.days[1].tempMax}º`;
  Selector.days[1].conditions.textContent = obj.days[1].conditions;

  Selector.days[2].day.textContent = obj.days[2].dayOfWeek;
  Selector.days[2].icon.src = weatherIcons[obj.days[2].icon];
  Selector.days[2].temp.textContent = `${obj.days[2].tempMin}º | ${obj.days[2].tempMax}º`;
  Selector.days[2].conditions.textContent = obj.days[2].conditions;

  Selector.days[3].day.textContent = obj.days[3].dayOfWeek;
  Selector.days[3].icon.src = weatherIcons[obj.days[3].icon];
  Selector.days[3].temp.textContent = `${obj.days[3].tempMin}º | ${obj.days[3].tempMax}º`;
  Selector.days[3].conditions.textContent = obj.days[3].conditions;
}

function renderLoading() {
  Selector.location.textContent = '...';
  Selector.currentTemp.textContent = '...';
  Selector.currentConditions.textContent = '...';
  Selector.currentFeelsLike.textContent = '...';

  Selector.days[0].temp.textContent = '...';
  Selector.days[0].conditions.textContent = '...';

  Selector.days[1].temp.textContent = '...';
  Selector.days[1].conditions.textContent = '...';

  Selector.days[2].day.textContent = '...';
  Selector.days[2].temp.textContent = '...';
  Selector.days[2].conditions.textContent = '...';

  Selector.days[3].day.textContent = '...';
  Selector.days[3].temp.textContent = '...';
  Selector.days[3].conditions.textContent = '...';
}

function searchWeather(e) {
  e.preventDefault();
  renderLoading();
  getWeather(Selector.form['search-box'].value).then(renderWeather);
}

function searchCurrentLocation(e) {
  e.preventDefault();
  Selector.form.reset();
  renderLoading();
  getCity().then(getWeather).then(renderWeather);
}

Selector.form.addEventListener('submit', searchWeather);
Selector.currentBtn.addEventListener('click', searchCurrentLocation);
