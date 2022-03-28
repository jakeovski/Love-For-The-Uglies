import React from 'react';
import AnimalOfTheDay from "./AnimalOfTheDay";
import Comments from "./Comments";


const Hub = ({user,setAlertMessage}) => {

    return(
        <>
            <AnimalOfTheDay/>
            <Comments user={user} setAlertMessage={setAlertMessage}/>
        </>
    )
}

export default Hub;