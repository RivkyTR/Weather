const HOT_TEMP = 30;
const NICE_TEMP = 20;

//This function gets the name of the city and itws id and updates the card according to the api answer
async function setWeather(name, cityId){

    const apiKey = '8ee633956bad6ae1965b557a94ecfcba';
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

//This function add the 4 cards to th grid, its called just in the beginning
function initFunction(places){
    places.forEach(place => addToGrid(place.name, place.hebrewName));
}

//This function adds a card dynamiclly to the grid
function addToGrid(name, hebrewName){
    let card = document.createElement('div');
    card.className = 'card';
    card.id = `card-${name}`;
    card.innerHTML = `
    <div class="place-description-icon">
        <div class="place-and-description">
            <h2>${hebrewName}</h2>
            <span class = weather-description id="description-${name}">תיאור מזג האוויר</span>
        </div>
        <img class="icon" id="icon-${name}" src="" alt="Weather Icon" />
    </div>
    <div class="stats">
        <div>
            <p>טמפ' נמדדת</p>
            <p id="temp-${name}">--°C</p>
        </div>
        <div>
            <p>טמפ' מורגשת</p>
            <p id="feels-like-${name}">--°C</p>
        </div>
        <div>
            <p>לחות</p>
            <p id="humidity-${name}">--%</p>
        </div>
    </div>`;
    document.getElementById('weather-cards').appendChild(card);
}

//This function updates the weather on the 4 cards
function setWeatherForAll(places){
    console.log("sdfghjkbvcd,");
    places.forEach(place => setWeather(place.name, place.id));
}

window.onload = () => {
    const places = [{ name: 'eilat', hebrewName: 'אילת', id: 295277 },
        { name: 'new-york', hebrewName: 'ניו יורק', id: 5128581 },
        { name: 'london', hebrewName: 'לונדון', id: 2643744 },
        { name: 'alaska', hebrewName: 'אלסקה', id: 5879092 }];

    initFunction(places);
    setWeatherForAll(places);
    
    //every 15 minutes refresh the weather data
    setInterval(() => setWeatherForAll(places), 900000);
  };  