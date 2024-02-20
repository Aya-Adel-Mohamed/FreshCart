import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';

const MainLayout = ({ userData, logOut }) => {

    return (

        <>
            <Navbar userData={userData} logOut={logOut} />
            <div className="container px-5 px-md-4 px-lg-3 px-xl-0">
                <Outlet></Outlet>
            </div>
            <div>
                <Offline>
                    <div className='network'>
                        <i className='fas fa-wifi me-2 text-main'></i> you're offline
                    </div>
                </Offline>
            </div>
            <Footer />
        </>

    );
}

export default MainLayout;