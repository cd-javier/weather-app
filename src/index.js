import './styles.css';
import { format } from 'date-fns';

async function getWeather(location = 'london') {
  try {
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LZSJQYYC6AWFNBWYJETNVFUHM`
    );
    const processedData = await data.json();

    return {
      location: processedData.resolvedAddress.split(',')[0],
      country: processedData.resolvedAddress.split(',').pop().trim(),
      currentConditions: {
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
          tempMax: processedData.days[0].tempmax,
          tempMin: processedData.days[0].tempmin,
          icon: processedData.days[0].icon,
        },
        1: {
          dayOfWeek: format(new Date(processedData.days[1].datetime), 'EEEE'),
          date: format(new Date(processedData.days[1].datetime), 'dd MMM'),
          conditions: processedData.days[1].conditions,
          tempMax: processedData.days[1].tempmax,
          tempMin: processedData.days[1].tempmin,
          icon: processedData.days[1].icon,
        },
        2: {
          dayOfWeek: format(new Date(processedData.days[2].datetime), 'EEEE'),
          date: format(new Date(processedData.days[2].datetime), 'dd MMM'),
          conditions: processedData.days[2].conditions,
          tempMax: processedData.days[2].tempmax,
          tempMin: processedData.days[2].tempmin,
          icon: processedData.days[2].icon,
        },
        3: {
          dayOfWeek: format(new Date(processedData.days[3].datetime), 'EEEE'),
          date: format(new Date(processedData.days[3].datetime), 'dd MMM'),
          conditions: processedData.days[3].conditions,
          tempMax: processedData.days[3].tempmax,
          tempMin: processedData.days[3].tempmin,
          icon: processedData.days[3].icon,
        },
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Oops, that doesn't look right");
    return getCity().then(getWeather);
  }
}

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

async function getCity() {
  const ipData = await fetch('https://ipinfo.io/json?token=d0371dd1f9210d');
  const jsonData = await ipData.json();

  return `${jsonData.city}, ${jsonData.region}, ${jsonData.country}`;
}
