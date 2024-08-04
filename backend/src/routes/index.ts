import { Router } from 'express';
import { getWeatherData } from '../controller/weatherController';
import { getMapData } from '../controller/mapController'

const weatherRouter = Router();

weatherRouter.get('/weather', getWeatherData);
weatherRouter.get('/maps/:z/:x/:y/:layer', getMapData);

export default weatherRouter;