import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom/dist/umd/react-router-dom.development';


const MainLayout = ({userData,logOut}) => {
    return (
        <>
        <Navbar userData={userData} logOut={logOut}/>
        <div className="container px-5 px-md-4 px-lg-3 px-xl-0">
            <Outlet></Outlet>
        </div>
        <Footer/>
        </>

    );
}

export default MainLayout;