import { format } from 'date-fns';
import getCity from './getCity';

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
        },
        1: {
          dayOfWeek: format(new Date(processedData.days[1].datetime), 'EEEE'),
          date: format(new Date(processedData.days[1].datetime), 'dd MMM'),
          conditions: processedData.days[1].conditions,
          tempMax: Math.floor(processedData.days[1].tempmax),
          tempMin: Math.floor(processedData.days[1].tempmin),
          icon: processedData.days[1].icon,
        },
        2: {
          dayOfWeek: format(new Date(processedData.days[2].datetime), 'EEEE'),
          date: format(new Date(processedData.days[2].datetime), 'dd MMM'),
          conditions: processedData.days[2].conditions,
          tempMax: Math.floor(processedData.days[2].tempmax),
          tempMin: Math.floor(processedData.days[2].tempmin),
          icon: processedData.days[2].icon,
        },
        3: {
          dayOfWeek: format(new Date(processedData.days[3].datetime), 'EEEE'),
          date: format(new Date(processedData.days[3].datetime), 'dd MMM'),
          conditions: processedData.days[3].conditions,
          tempMax: Math.floor(processedData.days[3].tempmax),
          tempMin: Math.floor(processedData.days[3].tempmin),
          icon: processedData.days[3].icon,
        },
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Oops');
    // eslint-disable-next-line no-console
    console.log(err);
    return getCity().then(getWeather);
  }
}

export default getWeather;
