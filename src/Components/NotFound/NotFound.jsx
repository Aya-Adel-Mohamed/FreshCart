import React from "react";
import notFound from '../../assets/error.svg';
import styles from './NotFound.module.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';
const NotFound = () => {
    return (
        <>
        <HelmetProvider>
           <Helmet>
                <title>FreshCart | NotFound Page</title>
            </Helmet>
            <section className="d-flex justify-content-center align-items-center">
                <img src={notFound} alt="" className={styles.image} />
            </section>
            </HelmetProvider>
        </>
    );
}
export default NotFound;