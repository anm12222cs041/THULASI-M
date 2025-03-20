const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Get from OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

function updateDateTime() {
    const now = new Date();
    document.querySelector('.time').textContent = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    document.querySelector('.date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();

        document.querySelector('.city').textContent = data.name;
        document.querySelector('.temperature').textContent = 
            Math.round(data.main.temp) + '°C';
        document.querySelector('.weather-desc').textContent = 
            data.weather[0].description;
        document.querySelector('.humidity').textContent = 
            data.main.humidity + '%';
        document.querySelector('.wind').textContent = 
            data.wind.speed + ' km/h';
        document.querySelector('.feels-like').textContent = 
            Math.round(data.main.feels_like) + '°C';
        document.querySelector('.pressure').textContent = 
            data.main.pressure + ' hPa';

        const weatherIcon = document.querySelector('.weather-icon');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    } catch (error) {
        alert('Please enter a valid city name');
    }
}

document.querySelector('.search-btn').addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    if (city) checkWeather(city);
});

document.querySelector('.search-box input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = event.target.value;
        if (city) checkWeather(city);
    }
});

// Update time every second
setInterval(updateDateTime, 1000);

// Initial updates
updateDateTime();
checkWeather('London'); // Default city
