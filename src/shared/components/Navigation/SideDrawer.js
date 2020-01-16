import React from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

const SideDrawer = props => {
    const content = <aside className="side-drawer">{props.children}</aside>;

    //Allosw the component to remain part of the component tree but render the content somewhere else.
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;