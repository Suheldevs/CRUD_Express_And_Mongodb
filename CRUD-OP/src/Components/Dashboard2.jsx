import React, { useState } from 'react'
import './Dashboard2.css';
import Dashboarduser from './Dashboard-user';
function Dashboard2() {
   

    const [currentview, setCurrentview] = useState('home');

    const handlemenuclick = (view) => {
        setCurrentview(view);
        console.log(currentview);
    }

    const rendercontent = () => {
        // console.log(currentview);
        switch (currentview) {
            case "Home":
                return <div>Home</div>;
            case "Profile":
                return (
                   <Dashboarduser/>
                );
            case "Setting":
                return <div>Setting</div>;
            default:
                return <div>default</div>
        }
    }



    return (
        <>
            <div className='main'>
                {/* {sidebar} */}

                <div className='slider'>
                    <h2>Slider</h2>
                    <ul>
                        <li onClick={() => handlemenuclick("home")}>Home</li>
                        <li onClick={() => handlemenuclick("Profile")}>Profile</li>
                        <li onClick={() => handlemenuclick("Setting")}>Setting</li>
                    </ul>
                </div>

                {/* main dashboard */}

                <div className="main-content">
                    <header className='header d-flex '>
                        <div className='profile-section'>
                            <img src="https://via.placeholder.com/40"
                                alt="profile" className='profile-picture' />
                            <span>John Doe</span>

                        </div>
                        <div className='dash'> Dashboard</div>
                    </header>
                    <main className='content p-4'>

                        {rendercontent()}</main>
                </div>
            </div>
        </>
    )
}

export default Dashboard2