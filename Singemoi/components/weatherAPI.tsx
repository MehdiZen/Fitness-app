const API_KEY = '1172a4c644a6024fb268a0bf31b686a7'; 

export async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=48.866667&lon=2.333333&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}