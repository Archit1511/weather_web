// Function to fetch weather data from Open-Meteo API
async function fetchWeatherData() {
    const url = "https://archive-api.open-meteo.com/v1/archive";
    const params = {
        latitude: 52.52,
        longitude: 13.41,
        start_date: "2024-02-20",
        end_date: "2024-03-05",
        hourly: "temperature_2m"
    };

    try {
        const response = await fetch(url + new URLSearchParams(params));
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

// Process weather data
async function processWeatherData() {
    try {
        const responseData = await fetchWeatherData();
        const response = responseData[0];

        console.log(`Coordinates ${response.latitude}°N ${response.longitude}°E`);
        console.log(`Elevation ${response.elevation} m asl`);
        console.log(`Timezone ${response.timezone} ${response.timezone_abbreviation}`);
        console.log(`Timezone difference to GMT+0 ${response.utc_offset_seconds} s`);

        const hourly = response.hourly;
        const hourly_temperature_2m = hourly.variables[0].values;

        const hourlyData = {
            date: Array.from({ length: hourly.time.length }, (_, i) => new Date(hourly.time[i] * 1000)),
            temperature_2m: hourly_temperature_2m
        };

        console.log(hourlyData); // Output the hourly data
    } catch (error) {
        console.error("Error processing weather data:", error);
    }
}

// Call the function to process weather data
processWeatherData();
