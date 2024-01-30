import React from 'react';
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ userData, logOut }) => {
    const navLink = [
        { name: 'Home', link: '/' },
        { name: 'Cart', link: 'cart' },
        { name: 'Products', link: 'products' },
        { name: 'Categories', link: 'categories' },
        { name: 'Brands', link: 'brands' }
    ]
    const iconName = [
        { className: 'fab mx-2 fa-instagram' },
        { className: 'fab mx-2 fa-facebook' },
        { className: 'fab mx-2 fa-tiktok' },
        { className: 'fab mx-2 fa-twitter' },
        { className: 'fab mx-2 fa-linkedin' },
        { className: 'fab mx-2 fa-youtube' },
    ]
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-xl-5 py-0 py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} alt="" className='w-100' /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userData !== null ? <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 ms-0">
                                {navLink?.map((nav, index) =>
                                    <li className="nav-item d-flex align-items-center" key={index}>
                                        <Link className={`${styles.navLinkFont} nav-link`} to={nav.link}>{nav.name}</Link>
                                    </li>
                                )}

                            </ul>
                        </> : null
                        }

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {userData === null ?
                                <>
                                    <li className="nav-item d-flex align-items-center">
                                        <Link className={`${styles.navLinkFont} nav-link`} to="signin">Login</Link>
                                    </li>
                                    <li className="nav-item d-flex align-items-center">
                                        <Link className={`${styles.navLinkFont} nav-link`} to="signup">Register</Link>
                                    </li>

                                </> :
                                <>
                                    <li className="nav-item d-flex align-items-center me-3">
                                        {iconName?.map((icon, index) =>
                                            <i className={`${icon.className} ${styles.iconFont}`} key={index}></i>
                                        )}

                                    </li>
                            
                                        <li className="nav-item d-flex align-items-center">
                                            <span className={`${styles.navLinkFont} nav-link`} onClick={logOut}>SignOut</span>
                                        </li>
                               

                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
<></>