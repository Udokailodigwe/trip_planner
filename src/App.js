import React, { useState, useEffect } from 'react';
// CssBaseline fixes padding, margin and background colours
// Grid for resizing on different device views
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/tripPlannerAPI';
import Header from './components/Header/Header';
import List from './components/List/List';
import Maps from './components/Maps/Maps';

const App = () => {
    const [places, setPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    //get users current location on app launch.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    //gets actual map boundary, and populate it into fetched data from the api.
    useEffect(() => {
        console.log(bounds);
        getPlacesData(bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data);
            })
    }, [coordinates, bounds]); //populate the dependency array to Compare. If there is change in coordinates and bounds, effect will re-render.

    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List places={places} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Maps
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={places}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App;