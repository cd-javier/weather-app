import './styles.css';
import getWeather from './getWeather';
import getCity from './getCity';

const Selector = (function () {
  return {
    form: document.querySelector('form'),
    location: document.getElementById('location'),
    currentIcon: document.getElementById('current-icon'),
    currentTemp: document.getElementById('current-temp'),
    currentConditions: document.getElementById('current-conditions'),
    currentFeelsLike: document.getElementById('current-feels-like'),
    days: {
      0: {
        icon: document.getElementById('0-icon'),
        temp: document.getElementById('0-temp'),
        conditions: document.getAnimations('0-conditions'),
      },
      1: {
        icon: document.getElementById('1-icon'),
        temp: document.getElementById('1-temp'),
        conditions: document.getAnimations('1-conditions'),
      },
      2: {
        day: document.getElementById('2-day'),
        icon: document.getElementById('2-icon'),
        temp: document.getElementById('2-temp'),
        conditions: document.getAnimations('2-conditions'),
      },
      3: {
        day: document.getElementById('3-day'),
        icon: document.getElementById('3-icon'),
        temp: document.getElementById('3-temp'),
        conditions: document.getAnimations('3-conditions'),
      },
    },
  };
})();

function displayWeather(obj) {
  // eslint-disable-next-line no-console
  console.log(`
        Location: ${obj.location}, ${obj.country}
        Temperature: ${obj.currentConditions.temp}
        Feels Like: ${obj.currentConditions.feelsLike}
        Conditions: ${obj.currentConditions.conditions}
        ${obj.currentConditions.icon}

        Today
        ${obj.days[0].date}
        ${obj.days[0].conditions}
        Max today: ${obj.days[0].tempMax}
        Min today: ${obj.days[0].tempMin}
        ${obj.days[0].icon}

        Tomorrow
        ${obj.days[1].date}
        ${obj.days[1].conditions}
        Max today: ${obj.days[1].tempMax}
        Min today: ${obj.days[1].tempMin}
        ${obj.days[1].icon}

        ${obj.days[2].dayOfWeek}
        ${obj.days[2].date}
        ${obj.days[2].conditions}
        Max today: ${obj.days[2].tempMax}
        Min today: ${obj.days[2].tempMin}
        ${obj.days[2].icon}

        ${obj.days[3].dayOfWeek}
        ${obj.days[3].date}
        ${obj.days[3].conditions}
        Max today: ${obj.days[3].tempMax}
        Min today: ${obj.days[3].tempMin}
        ${obj.days[3].icon}
        `);
}
