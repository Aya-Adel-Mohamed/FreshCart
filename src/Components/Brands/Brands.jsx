import React from 'react';
import styles from './Brands.module.css';
import Loading from '../Loading/Loading.jsx';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getBrands } from '../../apis/brands.api.js';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '../ReusableCompnents/ScrollToTop/ScrollToTop.jsx';


const Brands = () => {
    const { isFetching, data: brands } = useQuery({
        queryKey: ["brands"],
        queryFn: ({ signal }) => getBrands(signal),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        onError: (err) => {
        },
        keepPreviousData: true
    });

    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>FreshCart | Brands</title>
            </Helmet>
            {isFetching ? <Loading /> :
                <>
                    <div className="row my-5">
                        {brands?.map((brand, index) =>
                            <div className={`col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-5 ${styles.container}`} key={index}>
                                <Link to={`productbrands/${brand.slug}`}>
                                    <div className={`${styles.brandContainer}`}>
                                        <img src={brand.image} alt="" className='w-100' />
                                        <span>{brand.name}</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            }
            <ScrollToTop/>
            </HelmetProvider>
        </>
    );
}

export default Brands;