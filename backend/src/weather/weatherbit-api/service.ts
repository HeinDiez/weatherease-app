import { fetchWeatherData } from './connection';

export const getWeather = async (city: string) => {
    try {
        return await fetchWeatherData(city);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred while fetching weather data');
        }
    }
};