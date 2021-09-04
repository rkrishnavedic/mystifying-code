import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css";

const Navbar=(props)=>{

    return (
        <div className="navbar">
            <div className="left_nav">Mystifying Code</div>
            <div className="right_nav">
                <div><NavLink to="/ide">IDE</NavLink></div>
                <div>References</div>
                <div>About Us</div>
            </div>
        </div>
    )
}

export default Navbar;