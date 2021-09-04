import React from 'react';
import Navbar from './navbar/navbar';
import './home.css';
import Announcements from './announcements/announcements';

const Home = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="home-container">
                <Announcements/>
            </div>
        </div>
    )
}

export default Home;