import React from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Loading from '../Loading/Loading';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';

const Home = () => {
    return ( 
        <>
        <MainSlider/>
        <CategorySlider/>
        <FeaturedProducts/>
        </>
     );
}
 
export default Home;