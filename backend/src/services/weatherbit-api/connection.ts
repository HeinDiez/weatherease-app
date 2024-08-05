import axios from 'axios';
import { key, url } from './config'

export type params = {
    city: string,
    lat: string,
    lon: string,
}
export const fetchWeatherData = async ({city, lat, lon}: params) => {
    try {
        const response = await axios.get(url, {
            params: {
                lat,
                lon,
                key: key
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Axios error: ${error.message}`);
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }
};