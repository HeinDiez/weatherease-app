import { Router } from 'express';
import { getWeatherData } from '@/controller/weatherController';

const weatherRouter = Router();

weatherRouter.get('/weather', getWeatherData);
weatherRouter.get('/maps', getMapData);

export default weatherRouter;