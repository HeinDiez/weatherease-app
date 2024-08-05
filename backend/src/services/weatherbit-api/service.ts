import { fetchWeatherData, params } from './connection';
import WeatherDTO from './dto'
// import {  fixtures } from "./fixtures";

export const getWeather = async (location: params) => {
    try {
        const weatherData = await fetchWeatherData(location);
        const dto = new WeatherDTO();
        return dto.toObject(weatherData);

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred while fetching weather data');
        }
    }
};