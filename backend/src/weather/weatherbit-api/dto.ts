export interface WeatherData {
    wind_spd: number;
    uv: number;
    sunrise: string;
    sunset: string;
    pres: number;
    gust: number;
}

class WeatherDTO {
    constructor() {
    }

    toObject({ data }: any): WeatherData {
        const weather = data[0];
        return {
            wind_spd: weather.wind_spd,
            uv: weather.uv,
            sunrise: weather.sunrise,
            sunset: weather.sunset,
            pres: weather.pres,
            gust: weather.gust,
        };
    }
}

export default WeatherDTO;
