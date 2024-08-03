import { Socket } from 'socket.io';
import { getWeather } from '../weatherbit-api/service';

export const handleWeatherSocket = (socket: Socket) => {
    socket.on('getWeather', async (city = 'Hilversum') => {
        try {
            console.log('New data request');
            const weatherData = await getWeather(city);
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
