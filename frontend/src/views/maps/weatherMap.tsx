'use client';

import React, {useState} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Dropdown, { DropdownOption } from '@/components/form/dropdown';

import 'leaflet/dist/leaflet.css';

const WeatherMap: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<DropdownOption['value']>('temp_new');

    const options: DropdownOption[] = [
        { label: 'Clouds', value: 'clouds_new'},
        { label: 'Precipitation', value: 'precipitation_new'},
        { label: 'Sea level pressure', value: 'pressure_new'},
        { label: 'Wind speed', value: 'wind_new'},
        { label: 'Temperature', value: 'temp_new'},
    ];

    const handleSelect = (option: DropdownOption['value']) => {
        setSelectedOption(option);
    };

    return (
        <div>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={5}
                style={{height: '100vh', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <TileLayer
                    url={`${process.env.NEXT_PUBLIC_SERVER_API_URL}api/maps/{z}/{x}/{y}/${selectedOption}`}
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                />
                <div className='absolute top-4 right-4 z-[900]'>
                    <Dropdown
                        options={options}
                        onSelect={handleSelect}
                        model={selectedOption}/>
                </div>
            </MapContainer>
        </div>
    );
};

export default WeatherMap;
