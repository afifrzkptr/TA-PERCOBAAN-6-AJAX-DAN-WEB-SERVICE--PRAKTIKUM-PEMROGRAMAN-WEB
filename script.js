//Konfigurasi
const API_KEY = '0569ea2fec813f4fc3509020fc5e5d64';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
let currentUnit = 'metric'; // metric = Celsius, imperial = Fahrenheit
let currentCity = 'Bandar Lampung';
let isDarkMode = false;

// DOM Elements
const dom = {
    location: document.getElementById('locationDisplay'),
    date: document.getElementById('dateDisplay'),
    temp: document.getElementById('tempDisplay'),
    condition: document.getElementById('conditionDisplay'),
    humidity: document.getElementById('humidityDisplay'),
    wind: document.getElementById('windDisplay'),
    icon: document.getElementById('weatherIcon'),
    timestamp: document.getElementById('updateTimestamp'),
    forecast: document.getElementById('forecastContainer'),
    loading: document.getElementById('loadingIndicator'),
    favList: document.getElementById('favList'),
    favSection: document.getElementById('favoritesSection'),
    advice: document.getElementById('weatherAdvice'),
    lat: document.getElementById('latDisplay'),
    lon: document.getElementById('lonDisplay'),
    suggestionsDesktop: document.getElementById('suggestionsDesktop'),
    suggestionsMobile: document.getElementById('suggestionsMobile')
};


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        toggleTheme(true);
    }
    
    fetchWeatherData(currentCity);
    renderFavorites();
    updateClock();

    //(5 Menit)
    setInterval(() => {
        console.log('🔄 Auto-updating data...');
        fetchWeatherData(currentCity);
    }, 300000); 

    setInterval(updateClock, 1000);
});

// Fetch API

async function fetchWeatherData(city) {
    showLoading(true);
    try {

        const weatherRes = await fetch(`${BASE_URL}/weather?q=${city}&units=${currentUnit}&appid=${API_KEY}`);
        if (!weatherRes.ok) throw new Error('Kota tidak ditemukan');
        const weatherData = await weatherRes.json(); // Parsing JSON [cite: 109]

        const forecastRes = await fetch(`${BASE_URL}/forecast?q=${city}&units=${currentUnit}&appid=${API_KEY}`);
        const forecastData = await forecastRes.json();

        currentCity = weatherData.name;
        updateCurrentUI(weatherData);
        updateForecastUI(forecastData);
        updateAdvice(weatherData.weather[0].main);
        checkFavoriteStatus();
        
    } catch (error) {
        console.error('Error:', error);
        alert(`Gagal memuat data: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

async function searchCity(query, suggestionEl) {
    if (query.length < 3) {
        suggestionEl.classList.add('hidden');
        return;
    }
    try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`);
        const data = await res.json();
        
        suggestionEl.innerHTML = '';
        if(data.length > 0) suggestionEl.classList.remove('hidden');
        
        data.forEach(city => {
            const div = document.createElement('div');
            div.className = 'p-3 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer text-sm border-b dark:border-gray-700';
            div.textContent = `${city.name}, ${city.country}`;
            div.onclick = () => {
                suggestionEl.classList.add('hidden');
                fetchWeatherData(city.name);
            };
            suggestionEl.appendChild(div);
        });
    } catch (e) {
        console.error(e);
    }
}


function updateCurrentUI(data) {
    dom.location.textContent = `${data.name}, ${data.sys.country}`;
    dom.condition.textContent = data.weather[0].description;
    dom.temp.textContent = Math.round(data.main.temp);
    dom.humidity.textContent = `${data.main.humidity}%`;
    dom.wind.textContent = `${data.wind.speed} m/s`;
    dom.icon.textContent = getWeatherIcon(data.weather[0].main);
    
    dom.lat.textContent = data.coord.lat;
    dom.lon.textContent = data.coord.lon;

    const now = new Date();
    dom.timestamp.textContent = `Update: ${now.toLocaleTimeString()}`;
}

function updateForecastUI(data) {
    dom.forecast.innerHTML = '';
    
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

    dailyData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
        
        const card = document.createElement('div');
        card.className = 'forecast-card bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center cursor-default';
        card.innerHTML = `
            <p class="text-gray-500 text-xs font-bold mb-2">${dayName}</p>
            <div class="text-3xl mb-2">${getWeatherIcon(item.weather[0].main)}</div>
            <p class="font-bold text-lg">${Math.round(item.main.temp)}°</p>
            <p class="text-xs text-gray-400 capitalize">${item.weather[0].main}</p>
        `;
        dom.forecast.appendChild(card);
    });
}

function updateAdvice(condition) {
    const adviceMap = {
        'Rain': 'Jangan lupa bawa payung! Jalanan mungkin licin, hati-hati berkendara.',
        'Clear': 'Cuaca cerah! Waktu yang tepat untuk aktivitas luar ruangan atau menjemur pakaian.',
        'Clouds': 'Cuaca berawan. Cukup sejuk untuk olahraga ringan di luar.',
        'Thunderstorm': 'Ada badai petir. Sebaiknya tetap di dalam ruangan dan hindari alat elektronik.',
        'Drizzle': 'Gerimis ringan. Siapkan jas hujan jika ingin bepergian menggunakan motor.'
    };
    dom.advice.textContent = adviceMap[condition] || 'Tetap pantau perubahan cuaca hari ini dan jaga kesehatan!';
}


function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
        'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️'
    };
    return icons[condition] || '🌤️';
}

function updateClock() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dom.date.textContent = new Date().toLocaleDateString('id-ID', options);
}

function showLoading(show) {
    if(show) {
        dom.loading.classList.remove('hidden');
        dom.forecast.classList.add('hidden');
    } else {
        dom.loading.classList.add('hidden');
        dom.forecast.classList.remove('hidden');
    }
}


function toggleTheme(forceDark = false) {
    const html = document.documentElement;
    if (forceDark || !html.classList.contains('dark')) {
        html.classList.add('dark');
        document.getElementById('iconSun').classList.remove('hidden');
        document.getElementById('iconMoon').classList.add('hidden');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark');
        document.getElementById('iconSun').classList.add('hidden');
        document.getElementById('iconMoon').classList.remove('hidden');
        localStorage.setItem('theme', 'light');
    }
}

document.getElementById('themeToggle').addEventListener('click', () => toggleTheme());


document.getElementById('unitToggle').addEventListener('click', function() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    this.textContent = currentUnit === 'metric' ? '°C' : '°F';
    document.querySelectorAll('.temp-unit').forEach(el => el.textContent = currentUnit === 'metric' ? '°C' : '°F');
    fetchWeatherData(currentCity);
});


function getFavorites() {
    return JSON.parse(localStorage.getItem('afifWeatherFavs')) || [];
}

function checkFavoriteStatus() {
    const favs = getFavorites();
    const btn = document.getElementById('favBtn');
    const icon = document.getElementById('favIcon');
    
    if (favs.includes(currentCity)) {
        btn.classList.add('bg-yellow-100', 'border-yellow-400', 'text-yellow-700');
        icon.textContent = '⭐';
    } else {
        btn.classList.remove('bg-yellow-100', 'border-yellow-400', 'text-yellow-700');
        icon.textContent = '☆';
    }
}

document.getElementById('favBtn').addEventListener('click', () => {
    let favs = getFavorites();
    if (favs.includes(currentCity)) {
        favs = favs.filter(c => c !== currentCity);
    } else {
        favs.push(currentCity);
    }
    localStorage.setItem('afifWeatherFavs', JSON.stringify(favs));
    checkFavoriteStatus();
    renderFavorites();
});

function renderFavorites() {
    const favs = getFavorites();
    dom.favList.innerHTML = '';
    
    if (favs.length > 0) {
        dom.favSection.classList.remove('hidden');
        favs.forEach(city => {
            const btn = document.createElement('button');
            btn.textContent = city;
            btn.className = 'px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-xs shadow hover:bg-gray-100 transition';
            btn.onclick = () => fetchWeatherData(city);
            dom.favList.appendChild(btn);
        });
    } else {
        dom.favSection.classList.add('hidden');
    }
}


const setupSearch = (input, suggestionBox) => {
    let timeout;
    input.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => searchCity(e.target.value, suggestionBox), 500);
    });
   
    input.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            fetchWeatherData(e.target.value);
            suggestionBox.classList.add('hidden');
        }
    });
};

setupSearch(document.getElementById('cityInputDesktop'), dom.suggestionsDesktop);
setupSearch(document.getElementById('cityInputMobile'), dom.suggestionsMobile);


document.getElementById('refreshBtn').addEventListener('click', () => fetchWeatherData(currentCity));