import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAnimalOfTheDay} from "../../../actions/animalOfTheDay";
import {Alert, Chip, CircularProgress, Grid, Paper, Typography, useTheme} from "@mui/material";
import ReactRoundedImage from "react-rounded-image";
import {conservationStatus, conservationStatusNames} from "../../../Constants/general";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const AnimalOfTheDay = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const animalOfTheDay = useSelector((state) => state.animalOfTheDay);
    const [animalAlertMessage,setAnimalAlertMessage] = useState({
        type:'',
        message:''
    });
    const [animalLoading,setAnimalLoading] = useState(false);

    useEffect(() => {
        if(!animalOfTheDay.name) {
            console.log('I am dispatching');
            setAnimalLoading(true);
            dispatch(getAnimalOfTheDay(setAnimalAlertMessage,setAnimalLoading));
        }
    },[]);

    return(
        <Paper elevation={3} sx={{
            mt:1,
            borderRadius:4
        }}>
            <Grid container padding={1}>
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h2" fontWeight="bold" fontFamily="Indie Flower">Love for the Uglies!</Typography>
                </Grid>
                <Grid item xs={12} textAlign="center" sx={{mt:1}}>
                    <Typography variant="subtitle2">Here is the animal of the day:</Typography>
                </Grid>
                {
                    animalLoading ?
                        <Grid item xs={12} textAlign="center">
                            <CircularProgress/>
                        </Grid>
                        : animalOfTheDay.name ?
                        <Grid item container xs={12} alignItems="justify" spacing={1}>
                            <Grid item xs={12} textAlign="center">
                                <Typography fontWeight="bold" variant="h6">{animalOfTheDay.name}</Typography>
                            </Grid>
                            <Grid item container xs={12} xl={5} spacing={1} alignItems="center" sx={{
                                justifyContent:{xs:'center',xl:'flex-end'}
                            }}>
                                <Grid item xs="auto">
                                    <Typography variant="subtitle1">{conservationStatusNames[animalOfTheDay.endangered]}</Typography>
                                </Grid>
                                <Grid item xs="auto">
                                    <Chip label={animalOfTheDay.endangered} sx={{color:'white',backgroundColor:conservationStatus[animalOfTheDay.endangered]}}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} xl={2} display="flex" justifyContent="center">
                                <ReactRoundedImage
                                    image={animalOfTheDay.image}
                                    imageWidth="200"
                                    imageHeight="200"
                                    hoverColor={theme.palette.primary.main}
                                    roundedColor={theme.palette.primary.dark}
                                    roundedSize="10"
                                />
                            </Grid>
                            <Grid item container xs={12} xl={4} justifyContent="center">
                                <Grid item xs={10} md={8} xl={12} alignSelf="center" textAlign="center">
                                    <Typography variant="body2" align="justify">{animalOfTheDay.description}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                <Typography variant="subtitle2">Source: <a style={{textDecoration:'none'}} target="_blank" href={animalOfTheDay.source}>{animalOfTheDay.source}</a></Typography>
                            </Grid>
                        </Grid>
                        : animalAlertMessage.type &&
                            <Grid item xs={12} justifyContent="center">
                                <Alert severity={animalAlertMessage.type}>{animalAlertMessage.message}</Alert>
                            </Grid>

                }
                <Grid item container xs={12} mt={1}>
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="subtitle1" fontWeight="bold">You can chat below!</Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <ArrowDownwardIcon/>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AnimalOfTheDay;