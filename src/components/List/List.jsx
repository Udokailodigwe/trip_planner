import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();

    //create a state field that will contain all references
    const [elementRefs, setElementRefs] = useState([]);

    /** create reference to the places, so it can be passed to the state, on render with useEffect().
      use the array&fill method to get and fill places in array, and map over the array.
      return elementRefs[i] to access the specific place || create new refs.
      And finally setElementRefs equal to refs.
    */
    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elementRefs[i] || createRef());

        setElementRefs(refs);
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant='h4'>
                Restaurants, Hotels & Attractions around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3</MenuItem>
                            <MenuItem value={4}>Above 4</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid ref={elementRefs[i]} item key={i} xs={12}>
                                <PlaceDetails
                                    place={place}
                                    // use reference to target placeDetails in lists
                                    selected={Number(childClicked) === i}
                                    refProp={elementRefs[i]}

                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
}

export default List;