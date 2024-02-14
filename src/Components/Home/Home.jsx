import React from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

const Home = () => {
    return ( 
        <>
           <Helmet>
                <title>FreshCart | Home</title>
            </Helmet>
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProducts/>
        </>
     );
}
 
export default Home;