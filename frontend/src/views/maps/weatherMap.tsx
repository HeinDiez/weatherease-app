'use client';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const WeatherMap: React.FC = () => {
    const API_KEY = '';

    return (
        <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url={`${process.env.NEXT_PUBLIC_SERVER_API_URL}api/maps/{z}/{x}/{y}`}
                attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
            />
        </MapContainer>
    );
};

export default WeatherMap;
