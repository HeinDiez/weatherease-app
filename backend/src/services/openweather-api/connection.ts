import axios from 'axios';
import { key, url } from './config'

export const fetchMapData = async (z: string, x: string, y:string) => {
    try {
        const query = `${z}/${x}/${y}.png?appid=${key}`;
        const response = await axios.get(url + query, {
            responseType: 'arraybuffer'
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