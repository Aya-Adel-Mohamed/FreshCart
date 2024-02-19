import React, { useState } from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';

const Home = () => {
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000);
    return ( 
        <>
           <Helmet>
                <title>FreshCart | Home</title>
            </Helmet>
        {loading?<Loading/>:
        <>
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProducts/>
        
        </>}
        </>
     );
}
 
export default Home;