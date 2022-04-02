import React from 'react';
import AnimalOfTheDay from "./Components/AnimalOfTheDay";
import Comments from "./Components/Comments";


const Hub = ({user, setAlertMessage}) => {

    return (
        <>
            <AnimalOfTheDay/>
            <Comments user={user} setAlertMessage={setAlertMessage}/>
        </>
    )
}

export default Hub;