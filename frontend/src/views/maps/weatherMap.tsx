'use client';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const WeatherMap: React.FC = () => {
    const API_KEY = 'a98acb4cc5f6f1ee468d2b429c2193ad';

    return (
        <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
                attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
            />
        </MapContainer>
    );
};

export default WeatherMap;
