import { Request, Response } from 'express';
import { getWeather } from '../services/weatherbit-api/service';

export const getWeatherData = async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string || 'Hilversum';
        const weatherData = await getWeather(city);

        res.status(200).json(weatherData);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error');
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
};
