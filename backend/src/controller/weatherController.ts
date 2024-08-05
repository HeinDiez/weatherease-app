import { Request, Response } from 'express';
import { getWeather } from '../services/weatherbit-api/service';
import { weatherQuerySchema } from '../rules/weatherFormSchema'

export const getWeatherData = async (req: Request, res: Response) => {
    try {
        const { error, value } = weatherQuerySchema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const weatherData = await getWeather(value);
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
