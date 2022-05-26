import React from 'react';

// GoogleMapReact is for google map
import GoogleMapReact from 'google-map-react';

// Paper is a div with bgcolor, useMediaQuery is for mobile responsiveness
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles';

const Maps = () => {
    const classes = useStyles();

    // isMobile will be set to false if mediaQuery is larger than 600px
    const isMobile = useMediaQuery('(min-width:600px)');

    const coordinates = { lat: 0, lng: 0 }
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCk0TFAoHT5W3XFv3HgtNQReml5DlCFHF0' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={''}
                onChildClick={''}
            >

            </GoogleMapReact>
        </div>
    );
}



export default Maps;