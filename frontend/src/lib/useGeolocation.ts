import { useState, useEffect } from 'react';

interface LocationState {
    latitude: string | null;
    longitude: string | null;
    error: string | null;
}

const useGeolocation = (): LocationState => {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        error: null,
    });
    const [attempts, setAttempts] = useState<number>(0);
    const maxAttempts = 3;

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            setLocation((prevState) => ({
                ...prevState,
                error: 'Geolocation is not supported by this browser.',
            }));
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            setLocation((prev) => {
                return {
                    ...prev,
                    latitude: position.coords.latitude.toString(),
                    longitude: position.coords.longitude.toString(),
                    error: null,
                }
            });
            setAttempts(0);
        };

        const onError = (error: GeolocationPositionError) => {
            setAttempts((prevAttempts) => prevAttempts + 1);

            if (attempts < maxAttempts) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
            } else {
                setLocation((prevState) => ({
                    ...prevState,
                    error: error.message,
                }));
            }
        };

        const geoOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        const geoWatcher = navigator.geolocation.watchPosition(onSuccess, onError, geoOptions);

        return () => {
            navigator.geolocation.clearWatch(geoWatcher);
        };
    }, [attempts]);

    return {...location};
};

export default useGeolocation;