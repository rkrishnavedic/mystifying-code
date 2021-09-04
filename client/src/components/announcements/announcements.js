import React from 'react';
import { NavLink } from 'react-router-dom';

const Announcements = ()=>{

    return(
        <div className="announcements-container">
            <h5>
            <NavLink to="/ide">IDE</NavLink> is live!!
            </h5>
        </div>
    )
}

export default Announcements;