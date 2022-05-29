import React, { useState, useEffect } from 'react';
// CssBaseline fixes padding, margin and background colours
// Grid for resizing on different device views
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api/tripPlannerAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Maps from './components/Maps/Maps';

const App = () => {
    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [filteredPlaces, setFilteredPlaces] = useState([]);


    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('restuarants');
    const [rating, setRating] = useState('');

    //get users current location on app launch.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    /*
    modify on rating selections 
     */
    useEffect(() => {
        const filteredPlaces = places?.filter((place) => place.rating > rating);

        setFilteredPlaces(filteredPlaces);
    }, [rating]);


    /** gets actual map boundary, and populate it into fetched data from the api.
        populate the dependency array to Compare. If there is change in coordinates and bounds, effect will re-render.
    */
    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => {
                    setWeatherData(data);
                })

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                    setFilteredPlaces([])
                    setIsLoading(false);
                })
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Maps
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;