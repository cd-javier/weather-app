import './styles.css';
import weatherIcons from './icons';
import { format } from 'date-fns';

//--------------------------------
//     WEATHER API HANDLING
//--------------------------------

async function getWeather(location = 'madrid', unit = 'metric') {
  try {
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=LZSJQYYC6AWFNBWYJETNVFUHM`
    );
    const processedData = await data.json();

    return {
      location: processedData.resolvedAddress.split(',')[0],
      country: processedData.resolvedAddress.split(',').pop().trim(),
      currentConditions: {
        datetime: processedData.currentConditions.datetime.split(':')[0],
        temp: processedData.currentConditions.temp,
        feelsLike: processedData.currentConditions.feelslike,
        conditions: processedData.currentConditions.conditions,
        icon: processedData.currentConditions.icon,
      },
      days: {
        0: {
          dayOfWeek: format(new Date(processedData.days[0].datetime), 'EEEE'),
          date: format(new Date(processedData.days[0].datetime), 'dd MMM'),
          conditions: processedData.days[0].conditions,
          tempMax: Math.floor(processedData.days[0].tempmax),
          tempMin: Math.floor(processedData.days[0].tempmin),
          icon: processedData.days[0].icon,
          hours: processedData.days[0].hours,
        },
        1: {
          dayOfWeek: format(new Date(processedData.days[1].datetime), 'EEEE'),
          date: format(new Date(processedData.days[1].datetime), 'dd MMM'),
          conditions: processedData.days[1].conditions,
          tempMax: Math.floor(processedData.days[1].tempmax),
          tempMin: Math.floor(processedData.days[1].tempmin),
          icon: processedData.days[1].icon,
          hours: processedData.days[1].hours,
        },
        2: {
          dayOfWeek: format(new Date(processedData.days[2].datetime), 'EEEE'),
          date: format(new Date(processedData.days[2].datetime), 'dd MMM'),
          conditions: processedData.days[2].conditions,
          tempMax: Math.floor(processedData.days[2].tempmax),
          tempMin: Math.floor(processedData.days[2].tempmin),
          icon: processedData.days[2].icon,
          hours: processedData.days[2].hours,
        },
        3: {
          dayOfWeek: format(new Date(processedData.days[3].datetime), 'EEEE'),
          date: format(new Date(processedData.days[3].datetime), 'dd MMM'),
          conditions: processedData.days[3].conditions,
          tempMax: Math.floor(processedData.days[3].tempmax),
          tempMin: Math.floor(processedData.days[3].tempmin),
          icon: processedData.days[3].icon,
          hours: processedData.days[3].hours,
        },
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    showError();
    return getCity().then(getWeather);
  }
}

//--------------------------------
//        IP API HANDLING
//--------------------------------

async function getCity() {
  const ipData = await fetch('https://ipinfo.io/json?token=d0371dd1f9210d');
  const jsonData = await ipData.json();

  return `${jsonData.city}, ${jsonData.region}, ${jsonData.country}`;
}

//--------------------------------
//        DOM MANIPULATION
//--------------------------------

let unit = 'metric';
let currentLocation;

// Query Selectors
const Selector = (function () {
  return {
    body: document.querySelector('body'),
    unitWrapper: document.getElementById('unit-wrapper'),
    metricSelector: document.getElementById('metric-selector'),
    imperialSelector: document.getElementById('imperial-selector'),
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
    hours: document.getElementById('hours'),
    futureConditions: document.querySelector('.future-conditions'),
  };
})();

// Render the weather on screen
function renderWeather(obj) {
  Selector.body.dataset.style = obj.currentConditions.icon;
  Selector.location.textContent = `${obj.location}, ${obj.country}`;
  Selector.currentIcon.src = weatherIcons[obj.currentConditions.icon];
  if (obj.currentConditions.temp % 1 !== 0) {
    Selector.currentTemp.innerHTML = `${obj.currentConditions.temp.toString().split('.')[0]}<span>.${obj.currentConditions.temp.toString().split('.')[1]}</span>º`;
  } else {
    Selector.currentTemp.textContent = `${obj.currentConditions.temp}º`;
  }
  Selector.currentConditions.textContent = obj.currentConditions.conditions;
  Selector.currentFeelsLike.textContent = `Feels like ${obj.currentConditions.feelsLike}º`;

  Selector.hours.innerHTML = '';

  renderDay(obj, 0);
  renderDay(obj, 1);
  renderDay(obj, 2);
  renderDay(obj, 3);
}

function renderDay(obj, day) {
  if (day !== 0 && day !== 1)
    Selector.days[day].day.textContent = obj.days[day].dayOfWeek;
  Selector.days[day].icon.src = weatherIcons[obj.days[day].icon];
  Selector.days[day].temp.textContent =
    `${obj.days[day].tempMin}º | ${obj.days[day].tempMax}º`;
  Selector.days[day].conditions.textContent = obj.days[day].conditions;

  Selector.hours.appendChild(renderDayHour(obj, day));
}

function renderSingleHour(obj, day, hour) {
  const DOMHour = document.createElement('div');
  const hourData = obj.days[day].hours[hour];
  DOMHour.classList.add('hour');
  DOMHour.dataset.style = hourData.icon;
  DOMHour.innerHTML = `
          <div class="datetime">${hourData.datetime.split(':')[0]}h</div>
          <img src="${weatherIcons[hourData.icon]}" alt="">
          <div class="temp">${hourData.temp}º</div>
          <div class="conditions">${hourData.conditions}</div>
          <div class="chance">${Math.trunc(hourData.precipprob)}% chance of precipitation</div>
  `;

  return DOMHour;
}

function renderDayHour(obj, day) {
  const DOMDayHour = document.createElement('div');
  DOMDayHour.classList.add('hours-day');
  if (day !== 0) DOMDayHour.classList.add('hidden-hours');

  if (day === 0) {
    for (let i = obj.currentConditions.datetime; i < 24; i++) {
      const hour = renderSingleHour(obj, day, i);

      DOMDayHour.appendChild(hour);
    }
    for (let i = 0; i < obj.currentConditions.datetime; i++) {
      const hour = renderSingleHour(obj, 1, i);

      DOMDayHour.appendChild(hour);
    }
  } else {
    for (let i = 0; i < 24; i++) {
      const hour = renderSingleHour(obj, day, i);

      DOMDayHour.appendChild(hour);
    }
  }

  return DOMDayHour;
}

// Render screen during loading
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

// Change the value of currentLocation
function updateLocation(location) {
  currentLocation = location;
}

// Search form behavior
function searchWeather(e) {
  e.preventDefault();
  if (Selector.form['search-box'].value) {
    renderLoading();
    updateLocation(Selector.form['search-box'].value);
    getWeather(currentLocation, unit).then(renderWeather);
  }
}

// Current location behavior
function searchCurrentLocation() {
  Selector.form.reset();
  renderLoading();
  getCity()
    .then(updateLocation)
    .then(() => getWeather(currentLocation, unit).then(renderWeather));
}

// Unit toggle behavior
function changeUnit(e) {
  const target = e.target.closest('.unit-selector');
  if (
    target === Selector.metricSelector &&
    !Selector.metricSelector.classList.contains('unit-selected')
  ) {
    unit = 'metric';
    Selector.metricSelector.classList.toggle('unit-selected', true);
    Selector.imperialSelector.classList.toggle('unit-selected', false);
    getWeather(currentLocation, unit).then(renderWeather);
  } else if (
    target === Selector.imperialSelector &&
    !Selector.imperialSelector.classList.contains('unit-selected')
  ) {
    unit = 'us';
    Selector.imperialSelector.classList.toggle('unit-selected', true);
    Selector.metricSelector.classList.toggle('unit-selected', false);
    getWeather(currentLocation, unit).then(renderWeather);
  }
}

// Display future hours
function displayHours(e) {
  const target = e.target.closest('.future-day');
  if (!target) return;

  const hourDays = Array.from(document.querySelectorAll('.hours-day'));
  const days = Array.from(document.querySelectorAll('.future-day'));
  const selectedDay = Number(target.dataset.day);

  hourDays.forEach((day, index) => {
    day.classList.toggle('hidden-hours', index !== selectedDay);
    day.classList.toggle('shown-hours', index === selectedDay);
  });

  days.forEach((day, index) => {
    day.classList.toggle('selected-day', index === selectedDay);
  });
}

function showError() {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.textContent =
    'Oops, we could not find that location. Showing your estimated current location instead';
  Selector.body.appendChild(errorMessage);

  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 3000);

  setTimeout(() => {
    errorMessage.remove();
  }, 4000);
}

//--------------------------------
//        EVENT LISTENERS
//--------------------------------

Selector.form.addEventListener('submit', searchWeather);
Selector.currentBtn.addEventListener('click', searchCurrentLocation);
document.addEventListener('DOMContentLoaded', () => {
  renderLoading();
  getWeather(currentLocation, unit).then(renderWeather);
});
Selector.unitWrapper.addEventListener('click', changeUnit);
Selector.futureConditions.addEventListener('click', displayHours);
