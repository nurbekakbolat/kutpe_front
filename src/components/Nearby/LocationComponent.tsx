import { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState<{
    latitude: string,
    longitude: string,
    error: string,
  }>({
    latitude: "",
    longitude: "",
    error: "",
  });

  const getLocation = () => {
    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      setLocation(prevState => ({
        ...prevState,
        error: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const success = (position: any) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: "",
      });
    };

    // Error callback
    const error = () => {
      setLocation(prevState => ({
        ...prevState,
        error: 'Unable to retrieve your location.',
      }));
    };

    // Options for geolocation
    const options = {
      enableHighAccuracy: true, // Use high accuracy
      timeout: 5000, // Maximum wait time for a response
      maximumAge: 0, // Maximum age of a cached location that is acceptable to return
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {location.error ? (
        <p>Error: {location.error}</p>
      ) : (
        <p>
          Latitude: {location.latitude}<br />
          Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
