import axios from 'axios';
import { key, url } from './config'

export const fetchWeatherData = async (city: string) => {
    try {

        console.log(key, url, "check key, url")
        const response = await axios.get(url, {
            params: {
                city,
                key: key
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.log(error, "check here")
            throw new Error(`Axios error: ${error.message}`);
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }
};