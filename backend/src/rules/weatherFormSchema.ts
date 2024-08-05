import Joi from 'joi';

const weatherQuerySchema = Joi.object({
    city: Joi.string().when('lat', { is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required() }),
    lat: Joi.string().optional(),
    lon: Joi.string().optional()
}).or('city', 'lat');

export {weatherQuerySchema}