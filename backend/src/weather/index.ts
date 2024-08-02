import { Router, Request, Response } from "express";
import { getWeather } from './weatherbit-api/service';

import {fixtures} from './weatherbit-api/fixtures'

const weatherRouter = Router();

weatherRouter.get("/weather", async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string || 'Hilversum';
        const weatherData = await getWeather(city);

        // res.status(200).json(weatherData);
        // res.status(200).json(fixtures);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            console.error('Unknown error');
            res.status(500).json({ error: 'Failed to fetch weather data' });
        }
    }
});

export default weatherRouter;
