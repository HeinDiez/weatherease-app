import Joi from 'joi';

const weatherQuerySchema = Joi.object({
    city: Joi.string().optional(),
    lat: Joi.string().required(),
    lon: Joi.string().required()
}).or('city', 'lat');

export {weatherQuerySchema}