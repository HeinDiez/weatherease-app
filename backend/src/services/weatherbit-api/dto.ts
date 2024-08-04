
type WeatherIcon = {
    icon: string,
    code: number,
    description: string,
}

export interface WeatherData {
    wind_speed: number;
    uv_index: number;
    sunrise: string;
    sunset: string;
    pressure: number;
    gust: number;
    temperature: number;
    city_name: string;
    country_code: string;
    clouds_coverage: number;
    weather_icon: WeatherIcon;
}

class WeatherDTO {
    constructor() {
    }

    toObject({ data }: any): WeatherData {
        const [weather] = data;
        return {
            wind_speed: weather.wind_spd,
            uv_index: weather.uv,
            sunrise: weather.sunrise,
            sunset: weather.sunset,
            pressure: weather.pres,
            gust: weather.gust,
            temperature: weather.temp,
            city_name: weather.city_name,
            country_code: weather.country_code,
            clouds_coverage: weather.clouds,
            weather_icon: weather.weather as WeatherIcon,
        };
    }
}

export default WeatherDTO;
