import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet, HelmetProvider } from 'react-helmet-async';
const Products = () => {
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>FreshCart | Products</title>
            </Helmet>
            <FeaturedProducts />
            </HelmetProvider>
        </>
    );
}
export default Products
