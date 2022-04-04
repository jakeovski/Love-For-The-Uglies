import React, {useEffect, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Divider, Grid, LinearProgress, Typography, useTheme} from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import defaultImage from "../../../../images/profile.svg";


const EventPopularity = ({allEvents}) => {
    //States
    const [data, setData] = useState([]);
    const theme = useTheme();

    /**
     * useEffect that creates a data object for the graph from allEvents object
     */
    useEffect(() => {
        let dataObject = [];
        for (let event of allEvents) {
            dataObject.push({
                name: event.event.name,
                popularity: event.event.going.length,
                image: event.event.image
            })
        }
        dataObject.sort(compare);
        setData(dataObject);
    }, [allEvents]);

    //Comparator helper function
    const compare = (a, b) => {
        if (a.popularity < b.popularity) {
            return 1;
        }
        if (a.popularity > b.popularity) {
            return -1;
        }
        return 0;
    }

    return (
        <Grid container item xs={12}>
            <Grid item xs={12}>
                <Divider><Typography variant="h5" fontFamily="Indie Flower">Event Popularity</Typography></Divider>
            </Grid>
            {
              data.length > 0 ?
                  <>
                  <Grid item xs={12} sm={6}>
                      <ResponsiveContainer width="100%" height={350}>
                          <BarChart
                              width={500}
                              height={350}
                              data={data}
                          >
                              <CartesianGrid strokeDasharray="3 3"/>
                              <XAxis dataKey="name"/>
                              <YAxis/>
                              <Tooltip/>
                              <Legend/>
                              <Bar dataKey="popularity" fill={theme.palette.primary.light}/>
                          </BarChart>
                      </ResponsiveContainer>
                  </Grid>
                  <Grid item container xs={12} sm={6} spacing={1} alignContent="flex-start">
                      <Grid item xs={12} textAlign="center">
                          <Typography fontWeight="bold">Most popular event:</Typography>
                      </Grid>
                      <Grid item xs={12} display="flex" justifyContent="center">
                          <ReactRoundedImage
                              image={data.length > 0 ? data[0].image : defaultImage}
                              imageWidth="200"
                              imageHeight="200"
                              hoverColor={theme.palette.primary.main}
                              roundedColor={theme.palette.primary.dark}
                              roundedSize="10"
                          />
                      </Grid>
                      <Grid item xs={12} textAlign="center">
                          <Typography>{data.length > 0 ? data[0].name : 'None'}</Typography>
                      </Grid>
                  </Grid>
                  </>
                :
                <LinearProgress/>
            }
        </Grid>
    );

}

export default EventPopularity;