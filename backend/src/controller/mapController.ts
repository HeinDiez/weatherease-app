import { Request, Response } from 'express';
import { fetchMapData } from '../services/openweather-api/connection'

export const getMapData = async (req: Request, res: Response) => {
    try {
        const { z, x, y, layer } = req.params;
        const imageData = await fetchMapData(z, x, y, layer);
        res.set('Content-Type', 'image/png');
        res.send(imageData);
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
