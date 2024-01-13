import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';


const MainLayout = () => {
    return (
        <>
        <Navbar/>
        <div className="container">
            <Outlet></Outlet>
        </div>
        <Footer/>
        </>

    );
}

export default MainLayout;