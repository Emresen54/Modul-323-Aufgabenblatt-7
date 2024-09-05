const API_KEY = '7da898ed3cdfffb604dd290004d7e848';

const locationInput = document.getElementById('locationInput');
const addButton = document.getElementById('addButton');
const locationList = document.getElementById('locationList');

const fetchWeatherData = async (location) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data;
};

const addLocationRow = (location, temp, low, high) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="border px-4 py-2">${location}</td>
        <td class="border px-4 py-2">${Math.round(temp)}°C</td>  
        <td class="border px-4 py-2">${Math.round(low)}°C</td>   
        <td class="border px-4 py-2">${Math.round(high)}°C</td>  
        <td class="border px-4 py-2">
            <button class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">Delete</button>
        </td>
    `;

    row.querySelector('button').addEventListener('click', () => {
        row.remove();
    });

    locationList.appendChild(row);
};

addButton.addEventListener('click', async () => {
    const location = locationInput.value.trim();

    if (!location) {
        alert('Please enter a location');
        return;
    }

    try {
        const data = await fetchWeatherData(location);

        if (data.cod !== 200) {
            alert('Location not found. Please try again.');
            return;
        }

        const temp = data.main.temp;
        const low = data.main.temp_min;
        const high = data.main.temp_max;

        addLocationRow(data.name, Math.round(temp), Math.round(low), Math.round(high)); 

        locationInput.value = '';
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
        console.error('Error:', error);
    }
});
