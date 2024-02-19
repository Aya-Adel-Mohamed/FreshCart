import React, { useState } from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';
import Cart from '../Cart/Cart';
import { useQuery } from 'react-query';
import { getLoggedUserCart } from '../../apis/cart.api';


const Home = () => {
    const [loading, setLoading] = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, 2000);
    
    const { isFetching, data: cartDetails } = useQuery({
        queryKey: ["cart"],
        queryFn: getLoggedUserCart,
        refetchOnMount:true,
        refetchOnWindowFocus: true,
        onError: (err) => {
        },

        keepPreviousData: true,
    });
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