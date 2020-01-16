import React from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import './MainNavigation.css';

const MainNavigation = props => {
    return (
        //This is the content that will be passed to Main Header as a result of the 'props.children' property. Because this component is a child of MainHeader since we imported it here.
        <MainHeader>
            <button className="main-navigation__menu-btn">
                <span />
                <span />
                <span />
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">YourPlaces</Link>
            </h1>
            <nav>
                ...
            </nav>
        </MainHeader>
    );
};

export default MainNavigation;