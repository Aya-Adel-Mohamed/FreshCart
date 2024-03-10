import React from 'react';
import styles from './Footer.module.css'
import amazon from '../../assets/footer/amazon.png';
import americanExpress from '../../assets/footer/AmericanExpress.png';
import masterCard from '../../assets/footer/masterCard.png';
import paypal from '../../assets/footer/paypal.png';
import appleStore from '../../assets/footer/appleStore.png';
import googlePlay from '../../assets/footer/googlePlay.png';

const Footer = () => {
    return (
        <>
            <footer className={` ${styles.bgFooter} px-xl-5 px-0 py-0 pt-3 pb-4`}>
                <div className="container-fluid">
                    <h4 className={styles.footerTitle}>Get the FreshCart app</h4>
                    <p className={styles.paragraph}>We will send you a link, open it on your phone to download the app</p>
                    <div className="row px-3 mb-4">
                        <div className="col-xl-10 mb-3 col-lg-9">
                            <input type="text" className='form-control' placeholder='Email..' />
                        </div>
                        <div className="col-xl-2 col-lg-3">
                            <button className={`${styles.btnFont} btn bg-main text-white w-100`}>Share App Link</button>
                        </div>
                    </div>
                    <hr className={styles.lineColor} />
                    <div className={`row px-3 align-items-center`}>
                        <div className={`col-lg-7 d-flex align-items-center ${styles.gap}`}>
                            <h6 className={`${styles.paymentFont} me-3`}>Payment Partners</h6>
                            <img src={amazon} alt="" className={styles.imgWidthOne} />
                            <img src={americanExpress} alt="" className={styles.imgWidthTwo} />
                            <img src={masterCard} alt="" className={styles.imgWidthThree} />
                            <img src={paypal} alt="" className={styles.imgWidthFour} />
                        </div>
                        <div className={`col-lg-5 d-flex align-items-center justify-content-end ${styles.gap} ${styles.justify}`}>
                            <h6 className={`${styles.paymentFont} me-3`}>Get deliveries with FreshCart</h6>
                            <img src={appleStore} alt="" className={styles.imgWidthFive} />
                            <img src={googlePlay} alt="" className={styles.imgWidthSix} />
                        </div>
                    </div>
                    <hr className={styles.lineColor} />
                </div>
            </footer>
        </>
    );
}
export default Footer;