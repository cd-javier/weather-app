async function getCity() {
  const ipData = await fetch('https://ipinfo.io/json?token=d0371dd1f9210d');
  const jsonData = await ipData.json();

  return `${jsonData.city}, ${jsonData.region}, ${jsonData.country}`;
}

export default getCity;
