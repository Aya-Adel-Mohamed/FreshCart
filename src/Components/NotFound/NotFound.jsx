import React from "react";
import notFound from '../../assets/error.svg';
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <>
            <section className="d-flex justify-content-center align-items-center">
                <img src={notFound} alt="" className={styles.image} />
            </section>
        </>
    );
}

export default NotFound;