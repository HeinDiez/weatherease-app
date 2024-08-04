import { fetchWeatherData } from './connection';
import WeatherDTO from './dto'
import {  fixtures } from "./fixtures";

export const getWeather = async (city: string) => {
    try {
        // const weatherData = await fetchWeatherData(city);
        const dto = new WeatherDTO();
        return dto.toObject(fixtures);

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Unknown error occurred while fetching weather data');
        }
    }
};