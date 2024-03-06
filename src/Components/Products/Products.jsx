import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "../ReusableCompnents/ScrollToTop/ScrollToTop";
const Products = () => {
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>FreshCart | Products</title>
            </Helmet>
            <FeaturedProducts />
            <ScrollToTop/>
            </HelmetProvider>
        </>
    );
}
export default Products
