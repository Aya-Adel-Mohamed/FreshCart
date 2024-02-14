import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import { Helmet } from "react-helmet";

const Products = () => {
    return (
        <>
            <Helmet>
                <title>FreshCart | Products</title>
            </Helmet>
            <FeaturedProducts />
        </>
    );
}

export default Products
