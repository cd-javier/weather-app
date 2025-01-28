import './styles.css';
import getWeather from './getWeather';
import getCity from './getCity';

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
