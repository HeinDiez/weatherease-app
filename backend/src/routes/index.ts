import { Router } from 'express';
import { getWeatherData } from '../controller/weatherController';

const weatherRouter = Router();

weatherRouter.get('/weather', getWeatherData);

export default weatherRouter;