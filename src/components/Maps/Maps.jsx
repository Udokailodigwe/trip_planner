import React from 'react';

// GoogleMapReact is for google map
import GoogleMapReact from 'google-map-react';

// Paper is a div with bgcolor, useMediaQuery is for mobile responsiveness
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';

import useStyles from './styles';

const Maps = ({ setCoordinates, setBounds, coordinates, places }) => {
    const classes = useStyles();

    // isMobile will be set to false if mediaQuery is larger than 600px
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCk0TFAoHT5W3XFv3HgtNQReml5DlCFHF0' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={12}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={''}
            >
                {places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            isDesktop ? (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography ClassName={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name} />
                                </Paper>
                            ) : (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}



export default Maps;