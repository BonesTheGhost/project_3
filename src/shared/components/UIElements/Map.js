import React, { useRef, useEffect } from 'react';

import './Map.css';
import MainHeader from '../Navigation/MainHeader';

const Map = props => {
    const mapRef = useRef();

    //Object destructuring that pulls values and keys out of props and stores them as new constants.
    const { center, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });

        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);

    return (
        <div 
        ref={mapRef} 
        className={`map ${props.className}`} 
        style={props.style}
        ></div>
    );
};

export default Map;