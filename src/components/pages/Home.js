import React from 'react';
import QRCodeButton from '../QRCodeButton';
import AnimatedFish from '../AnimatedFish';
import AnimatedText from '../AnimatedText';
import SearchBar from '../SearchBar';
const Home =()=>{
    return(
        <>
        <AnimatedFish/>
        <AnimatedText text="Monitoring"/>
        <AnimatedText text="System"/>
        <SearchBar placeholder="Enter a fishponds ID..."/>
        <QRCodeButton/>
        </>
    );

}

export default Home;