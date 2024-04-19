import { Input, IconButton, Grid } from "@mui/material"
import { useState, useEffect } from "react"
import { setActiveTab } from '../../models/slices/tabsSlice';
import { Tabs } from '../../models/slices/types';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { client } from '../../client'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Places from "./Places";
import { Banks } from "./Place";

export interface BankModel {
  type: string;
  id: string
  lat: number
  lon: number
  distance?: string
  icon: string
  tags: {
    amenity: string;
    brand: string;
    "brand:wikidata": string;
    "contact:instagram": string;
    "contact:phone": string;
    "contact:website": string;
    name: string;
    opening_hours: string;
    operator: string;
  }
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const Nearby = () => {
  
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const { page } = useParams();
  const [data, setData] = useState<BankModel[]>([]);
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

 useEffect(() => {
     dispatch(setActiveTab(page as Tabs));
    if (!location.latitude || !location.longitude) return;
    
    const fetchNearby = async () => {
      try {
         return await client.post('/get-nearest-banks/', {
          lat: location.latitude,
          lon: location.longitude
        })
        }
        catch (error) {
            console.log(error)
        }
      }
      fetchNearby().then((res) => {
        if (!res) return;

        const newData = res.data.map((place: BankModel) => {
          const distance =  getDistanceFromLatLonInKm(parseFloat(location.latitude), parseFloat(location.longitude), place.lat, place.lon);
          
          place.icon = Banks[place.tags.name]

          return {
            ...place,
            distance: distance.toFixed(2),
          }
        });

        setData(newData);
      })
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [page, location]);



 useEffect(() => {
  const timerId = setTimeout(() => {
    if (search) {
      const fetchBySearch = async () => {
        try {
          return await client.post('/get-nearest-banks-by-location/', {
            location: search
          });
        } catch (error) {
          console.error(error);
        }
      };

    fetchBySearch()
    .then((res) => {
      if (!res) return;

      const newData = res.data.map((place: BankModel) => {
        const distance =  getDistanceFromLatLonInKm(parseFloat(location.latitude), parseFloat(location.longitude), place.lat, place.lon);
        console.log(distance)
        return {
          ...place,
          distance: distance.toFixed(2),
        }
      });

      
      setData(newData);
    })
    }
  }, 2000);

  return () => clearTimeout(timerId);
}, [search, location.latitude, location.longitude]);

  return (
    <div style={{
        marginTop: "30px",
        width: "100%",
        flex: 1,
    }}>
<Grid container spacing={2} marginTop="20px">
    <Grid item xs={10} md={9}>
    <Input placeholder="Search Nearby Facilities"sx={{
            borderRadius: "0px",
            borderBottom: "1px solid #fff",
            height: "50px",
            width: "100%",
            backgroundColor: "transparent",
            padding: "10px",
            color: "#121212",
            '&::placeholder': {
                color: "transparent",
                opacity: 1
            }
        }} onChange={(e) => setSearch(e.target.value)} value={search}/>
</Grid>
<Grid item xs={2} md={3} sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "end"
}}>
<IconButton sx={{
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "#121212",
    float: "right"
}}>
    <FilterAltIcon />
</IconButton>
</Grid>
</Grid>

<Places data={data}/>
    </div>
  )
}

export default Nearby