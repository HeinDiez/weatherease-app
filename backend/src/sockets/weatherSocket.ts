import { Socket } from 'socket.io';
import { getWeather } from '../services/weatherbit-api/service';
import {weatherQuerySchema} from "../rules/weatherFormSchema";

export const handleWeatherSocket = (socket: Socket) => {
    socket.on('getWeather', async (city, lat, lon) => {
        try {
            const { error, value } = weatherQuerySchema.validate({city, lat, lon});
            if (error) {
                socket.emit('weatherUpdate', { error: error.details[0].message });
                return
            }
            console.log('New data request', {city, lat, lon});
            const weatherData = await getWeather(value);
            socket.emit('weatherUpdate', weatherData);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                socket.emit('weatherUpdate', { error: error.message });
            } else {
                console.error('Unknown error');
                socket.emit('weatherUpdate', { error: 'Failed to fetch weather data' });
            }
        }
    });
};
