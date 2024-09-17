const places = [
    { name: 'eilat', hebrewName: 'אילת', id: 295277 },
    { name: 'new-york', hebrewName: 'ניו יורק', id: 5128581 },
    { name: 'london', hebrewName: 'לונדון', id: 2643744 },
    { name: 'alaska', hebrewName: 'אלסקה', id: 5879092 }
  ];
const apiKey = '8ee633956bad6ae1965b557a94ecfcba';

async function setWeather(name, cityId){
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&lang=he&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Updating the cards with the weather data
        document.getElementById(`temp-${name}`).textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById(`feels-like-${name}`).textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById(`humidity-${name}`).textContent = `${data.main.humidity}%`;
        document.getElementById(`description-${name}`).textContent = data.weather[0].description;

        // set the icon based on the temperature
        const temp = data.main.temp;
        const iconElement = document.getElementById(`icon-${name}`);
        if (temp > 30) {
            iconElement.src = 'https://img.icons8.com/emoji/48/sun-emoji.png';
        } else if(temp>20){
            iconElement.src = 'https://img.icons8.com/emoji/48/sun-behind-cloud.png';
        } else{
            iconElement.src = 'https://img.icons8.com/emoji/48/snowflake-emoji.png';
        }
    } catch (error) {
        console.error('Error fetching weather data with API call:', error);
    }
}


function setWeatherForAll(){
    places.forEach(place => setWeather(place.name, place.id));
}

window.onload = () => {
    setWeatherForAll();
    
    //every 15 minutes refresh the weather data
    setInterval(setWeatherForAll, 900000);
  };    